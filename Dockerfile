# Etapa 1: Construcción
FROM node:20-alpine AS build

WORKDIR /app

ARG NEXT_PUBLIC_PG_HOST
ARG NEXT_PUBLIC_PG_PORT
ARG NEXT_PUBLIC_PG_DB
ARG NEXT_PUBLIC_PG_USER
ARG NEXT_PUBLIC_PG_PASS

ENV NEXT_PUBLIC_PG_HOST=${NEXT_PUBLIC_PG_HOST}
ENV NEXT_PUBLIC_PG_PORT=${NEXT_PUBLIC_PG_PORT}
ENV NEXT_PUBLIC_PG_DB=${NEXT_PUBLIC_PG_DB}
ENV NEXT_PUBLIC_PG_USER=${NEXT_PUBLIC_PG_USER}
ENV NEXT_PUBLIC_PG_PASS=${NEXT_PUBLIC_PG_PASS}

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# Etapa 2: Producción
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/.next ./.next

RUN npm ci --only=production

EXPOSE 3000

CMD ["npm", "start"]