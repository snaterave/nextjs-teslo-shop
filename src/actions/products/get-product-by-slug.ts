'use server'

import prisma from "@/lib/prisma"

export const getProductBySlug = async(slug:string)=>{
    try {
        const products = await prisma.product.findFirst({
            include:{
                ProductImage: true
                // {
                //     select:{
                //         url:true,
                //         id: true
                //     }
                // }
            },
            where:{
                slug: slug
            }
        });

        if(!products) return null;

        return{
            ...products,
            images: products.ProductImage.map(image=>image.url)
            
        }
    } catch (error) {
        throw new Error("Error al obtener el producto")
    }
}