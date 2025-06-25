"use client";

import { useState } from "react";
import { QuantitySelector, SizeSelector } from "@/components";
import { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  // Conectar con el store
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState<boolean>(false);

  const addToCart = () => {
    setPosted(true);
    if (!size) return;
    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      images: product.images[0],
    };
    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  };

  return (
    <>
      {posted && !size && (
        <span className="mt-2 text-red-500 fade-in">
          Debe seleccionar una talla
        </span>
      )}
      {/* selector de tallas */}
      <SizeSelector
        selectedSize={size}
        availabeSizes={product.sizes}
        onSizeSelected={(size) => setSize(size)}
      />
      {/* selector de cantidad */}
      <QuantitySelector
        quantity={quantity}
        onQuantitySelected={(quantity) => setQuantity(quantity)}
      />
      {/* boton */}
      <button onClick={addToCart} className="btn-primary my-5">
        Agregar al Carrito
      </button>
    </>
  );
};
