
// [1,2,3,...,40]

export const generatePaginationNumbers = (currentPage:number, totalPage:number)=>{
    // si el nro total de paginas es 7 o menos las mostramos todas
    if(totalPage <= 7){
        return Array.from({ length: totalPage}, (_,i)=> i+1); // [1,2,3,4,5,6,7]
    }

    // si la pagina actual está entre las 3 primeras
    if(currentPage <=3){
        return [1,2,3,'...', totalPage - 1, totalPage];
    }
    
    // si la pagina actula esta entre las ultmimas 3 paginas
    if(currentPage >= totalPage - 2){
        
        return [1,2,'...', totalPage - 2,totalPage - 1, totalPage];
    }

    // si la pagin aactual esta en otro lugar medio mostramos la primera pagina

    return[
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPage
    ]
    
}