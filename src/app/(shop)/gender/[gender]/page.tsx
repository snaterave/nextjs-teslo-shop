export const revalidate = 60;

import { getPaginatedproductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@/generated/prisma";
// import { ValidCategory } from "@/interfaces";
// import { initialData } from "@/seed/seed";
import { redirect } from "next/navigation";
// import { notFound } from "next/navigation";

interface Props {
  params: {
    gender: string;
  };

  searchParams: {
    page?: string;
  };
}

// const seedProducts = initialData.products;

export default async function CategoryPage({ params, searchParams }: Props) {
  const { gender } = params;

  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, currentPage, totalPages } =
    await getPaginatedproductsWithImages({
      page,
      gender: gender as Gender,
    });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  const labels: Record<string, string> = {
    men: "para hombres",
    women: "para mujeres",
    kid: "para niños",
    unisex: "para todos",
  };

  // if ( id === 'kids' ) {
  //   notFound();
  // }

  return (
    <>
      <Title
        title={`Artículos de ${labels[gender]}`}
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
