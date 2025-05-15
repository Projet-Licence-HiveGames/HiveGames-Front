FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY tsconfig.node.json ./
COPY tsconfig.app.json ./
COPY vite.config.mts ./
COPY index.html ./
COPY src src
COPY module-patch.d.ts ./
RUN npm i @rollup/rollup-linux-x64-musl
RUN npm i
RUN npm run build

FROM httpd:2.4-alpine
COPY --from=builder /app/dist /usr/local/apache2/htdocs/
EXPOSE 80