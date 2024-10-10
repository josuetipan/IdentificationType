# Usa una imagen base ligera de Node.js en este caso Node 18
FROM node:18-alpine AS base

#CRea la carpeta para la area de trabajo
WORKDIR /app

# Copia los paquetes y las dependencias del proyecto al área de trabajo
COPY package*.json ./

RUN npm install

COPY . .

# Genera las definiciones de la API con Prisma
RUN npx prisma generate

# Construye la aplicacion
RUN npm run build

# Construye una imagen de produccion
FROM node:18-alpine AS production

# Crea un area de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/dist ./dist
COPY --from=base /app/prisma ./prisma

# Establece el proyecto en modo produción
ENV NODE_ENV=production

# Expone el puerto del proyecto
EXPOSE 3000

# Ejecuta las migraciones y luego la aplicación
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/main"]
