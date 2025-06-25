This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Descripción

Este es un e-commerce de practica para revisar algunos conceptos de Nextjs.
Dentro del e-commerce tendremos las siguientes secciones: - Catálogo de productos - Carrito de compras - Buscador

## Versión de Node

"node": ">=18.18.0"

## Recursos usados en la app

- Docker
- Postgresl
- Zustand
- swipperjs

## Ejecutar en DEV

1. Clonar el repositorio
2. Crear una copia del `.env.template` y renombrarlo a `.env` y cambiar las variables de entorno.
3. Instalar las dependencias `npm install`
4. Ejecutar: `docker compose up -d` para levantar la bd de postgresql
5. Correr las migraciones de prisma `npx prisma migrate dev`
6. Ejecutar seed `npm run seed`
7. Levantar el proyecto `npm run dev`

## Ejecutar en PROD

## Levantar el contenedor de BD postgresql

Ejecutar: `docker compose up -d`

## Comandos de Prisma

- Traer datos de una BD previamente creada
  `npx prisma db pull`
- Crear modelo en una BD
  `npx prisma migrate dev --name ProducCategory`
- Crear el cliente
  `npx prisma generate`
