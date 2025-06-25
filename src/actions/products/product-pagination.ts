'use server';

import { Gender } from "@/generated/prisma";
import prisma from "@/lib/prisma";

interface PaginationOptions{
    page?:number,
    take?:number;
    gender?:Gender;
}

// SERVER ACTION
export const getPaginatedproductsWithImages = async({
    page= 1,
    take=12,
    gender
}: PaginationOptions)=>{
    // validamos sea un numero
    if(isNaN(Number(page))) page = 1;
    if(page < 1) page = 1 ;

    try {
        // 1. Obtener los productos
        const products = await prisma.product.findMany({
            take: take,
            skip: (page - 1) * take,
            include:{
                ProductImage:{
                    take: 2,
                    select:{
                        url: true
                    }
                }
            },
            where: {
                gender:gender
            }
        });
        // const products = await prisma.category.findMany({
        //     include:{
        //         Product:{
        //             take: 10
        //         }
        //     }
        // });
        // console.warn(products)

        // 2. Calcular total de paginas
        const totalCount = await prisma.product.count({
            where: {
                gender:gender
            }
        });
        const totalPages = Math.ceil(totalCount/take);
        return {
            currentPage: page,
            totalPages: totalPages,
            products: products.map(product =>({
                ...product,
                images: product.ProductImage.map(image=>image.url)
            }))
        }
    } catch (error) {
        throw new Error('No se pudieron cargar los productos ...')
    }
}