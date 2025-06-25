import { initialData} from './seed';
import { countries } from './seed-countries';
import prisma from '../lib/prisma'

async function main(){
    const {categories,products, users} = initialData;

    // 1. Borrar registror previos
    // await Promise.all([
    await prisma.orderAddress.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();

    await prisma.userAddress.deleteMany();
    await prisma.user.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.country.deleteMany();
    // ]);

    await prisma.user.createMany({
        data:users
    })

    // 2. Categorias
    const categoriesData = categories.map(category =>({
        name: category
    }))
   await  prisma.category.createMany({
        data:categoriesData
    })

    // Create countries
    await prisma.country.createMany({
        data: countries
    })

    const categoriesDb = await prisma.category.findMany()
    // const categoriesMap = categoriesDb.reduce((acc, category) => {
    //     acc[category.name] = category.id;
    //     return acc;
    //   }, {} as Record<string,string>);

    const categoriesMap = Object.fromEntries(
        categoriesDb.map(category => [category.name.toLocaleLowerCase(), category.id] ) 
      );

    // 3. Productos

    products.forEach(async(product) =>{
        const {type, images, ...rest} = product;
        const dbProduct = await prisma.product.create({
            data:{
                ...rest, 
                categoryId: categoriesMap[type]
            }
        })
        // 4. Images
    
    const imagesData = images.map( image => ({
        url: image,
        productId: dbProduct.id
      }));
  
      await prisma.productImage.createMany({
        data: imagesData
      });
    });

      
    console.log('Ejecutado correctamente')
}

(()=>{
    if(process.env.NODE_ENV === 'production') return
    main()
    console.log(' process.env.NODE_ENV = ', process.env.NODE_ENV)
})()