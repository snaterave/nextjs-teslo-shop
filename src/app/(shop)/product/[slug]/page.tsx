export const revalidate = 604800; // 7 dias

import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
// import { initialData } from "@/seed/seed";
import { titleFont } from "@/config/fonts";
import {
  ProductMobileSlideShow,
  ProductSlideShow,
  StockLabel,
} from "@/components";
import { getProductBySlug } from "@/actions";
import { AddToCart } from "./ui/AddToCart";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.title ?? "Producto no encontrado",
    description: product?.description,
    openGraph: {
      title: product?.title,
      description: product?.description,
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;
  // const product = initialData.products.find((product) => product.slug === slug);
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* SlideShow */}

      <div className="col-span-1 md:col-span-2">
        {/* Mobile SlideShow */}

        <ProductMobileSlideShow
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />
        {/* Desktop SlideShow */}
        <ProductSlideShow
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
      </div>
      {/* details */}
      <div className="col-span-1 px-5">
        <StockLabel slug={product.slug} />
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        <AddToCart product={product} />
        {/* Desctiption */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
