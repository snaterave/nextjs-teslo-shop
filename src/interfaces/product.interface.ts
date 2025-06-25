export interface Product {
    id: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: Size[];
    slug: string;
    tags: string[];
    title: string;
    //todo: type: Type;
    gender: ValidCategory;
  }

  export interface CartProduct{
    id: string;
    slug: string;
    title: string;
    price: number;
    quantity: number;
    size: Size;
    images: string;
  }

  export interface ProductImage {
    id: number;
    url: string;
    productId: string;
  }
type ValidCategory = 'men'|'women'|'kid'|'unisex';
export type Size = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
export type ValidType = 'shirts'|'pants'|'hoodies'|'hats';
