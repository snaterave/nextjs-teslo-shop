import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface InformationCart{
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart:number;
}
interface State{
    cart: CartProduct[];

    getTotalItems: () => number;
    getSummaryInformation: ()=> InformationCart;
    addProductToCart: (product: CartProduct) => void;
    updateProductQuantity: (product: CartProduct, quantity:number) => void;
    removeProduct: (product: CartProduct) => void;
    clearCart: () => void;

}


export const useCartStore = create<State>()(
    
    persist(
        (set,get) => ({
            cart:[],
    
            // Methods
            getTotalItems: ()=>{
                const { cart } = get();
                return cart.reduce((total,item) => total + item.quantity,0)
            },
            getSummaryInformation:(): InformationCart =>{
                const {cart, getTotalItems} = get();
                const subTotal = cart.reduce(
                    (subTotal, product) => (product.quantity * product.price) + subTotal,0
                );
                const tax = subTotal * 0.15;
                const total = subTotal + tax;
                // const itemsInCart = cart.reduce((total,item) => total + item.quantity,0);
                const itemsInCart = getTotalItems();

                return {
                    subTotal, 
                    tax, 
                    total, 
                    itemsInCart,
                }

            },
            addProductToCart:(product: CartProduct)=>{
                const {cart}= get();
                
                // - Revisa si el producto existe en el carrito con la talla seleccionada
                const productInCart = cart.some( (item)=>(item.id === product.id && item.size === product.size));
    
                if(!productInCart){
                    // el set se encarga de comunicar el cambio
                    set({cart:[...cart,product]}); //Agregamos el nuevo producto
                    return;
                }
                // - El producto existe por talla, se debe incrementar
                const updateCartProduct = cart.map((item)=>{
    
                    if(item.id === product.id && item.size === product.size){
                        return { ...item, quantity: item.quantity + product.quantity}
                    }
    
                    return item
    
                });
    
                set({cart: updateCartProduct})
            },
            updateProductQuantity: (product: CartProduct, quantity:number)=>{
                const {cart} = get();
                const updateCartProduct = cart.map((item)=>{
    
                    if(item.id === product.id && item.size === product.size){
                        return { ...item, quantity: quantity}
                    }
    
                    return item
    
                });
    
                set({cart: updateCartProduct})

            },
            removeProduct: (product: CartProduct) =>{
                const {cart} = get();
                const updateCartProduct = cart.filter( item=> item.id !== product.id || item.size !== product.size);

                set({cart: updateCartProduct})
            },
            clearCart: () =>{
                set({cart:[]})
            }
    
        })
        ,
        {
            name:'shopping-cart',
            
        }
    )
)