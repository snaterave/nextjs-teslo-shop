"use client";
import Image from "next/image";
import { useCartStore } from "@/store";
import { ProductImage, QuantitySelector } from "@/components";
import { useEffect, useState } from "react";
import Link from "next/link";

export const ProductsInCart = () => {
  const removeProduct = useCartStore((state) => state.removeProduct);
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p className="animate-pulse">Loading ...</p>;
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}+${product.size}`} className="flex mb-5">
          <ProductImage
            src={product.images}
            width={100}
            height={100}
            style={{
              width: "100px",
              height: "100px",
            }}
            alt={product.title}
            className="mr-5 rounded"
          />

          <div>
            <Link
              className="hover:underline cursor-pointer"
              href={`/product/${product.slug}`}
            >
              {product.size} - {product.title}
            </Link>
            <p>${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantitySelected={(value) =>
                updateProductQuantity(product, value)
              }
            />

            <button
              onClick={() => removeProduct(product)}
              className="underline mt-3"
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
