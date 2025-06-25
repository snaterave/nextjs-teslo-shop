'use server'

import prisma from "@/lib/prisma";

export const setTransactionId = async(orderId:string, transactionId:string)=>{
    try {
        const order = await prisma.order.update({
            where: {id: orderId},
            data:{ transactionId: transactionId}
        });
        if( !order){
            return {
                ok: false,
                message: `No se encontró uan orden con e ${ orderId}`
            }
        }

        return { ok: true }

    } catch (error) {
        return {
            ok: false,
            message: 'No se puedo actualizar el id de la trasacción'
        }
    }
}