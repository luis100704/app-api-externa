# 🎬 App de Películas

Aplicación fullstack desarrollada con Next.js, TypeScript y PostgreSQL.

## 🚀 Tecnologías

- Next.js (App Router)
- TypeScript
- PostgreSQL
- Prisma
- API externa: TMDB

## ✨ Funcionalidades

- Listado de películas populares
- Paginación con query params
- Búsqueda de películas
- Sistema de favoritos persistente en base de datos
- Loading automático
- Diseño responsive

## 🧠 Arquitectura

- Server Components para renderizado
- API interna para favoritos
- Base de datos PostgreSQL con Prisma
- Uso de searchParams async (Next 15)

## 🛠 Instalación

1. Clonar repositorio
2. Instalar dependencias:

```bash
npm install
```
3. Configurar variables de entorno:

NEXT_PUBLIC_TMDB_API_KEY=
DATABASE_URL=

4. Ejecutar:

npm run dev