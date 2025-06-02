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
COPY .env.docker ./.env

RUN npm i @rollup/rollup-linux-x64-musl && \
    npm i && \
    npm run build

FROM httpd:2.4-alpine

COPY --from=builder /app/dist /usr/local/apache2/htdocs/

# Copie du fichier .htaccess
COPY .htaccess /usr/local/apache2/htdocs/.htaccess

# Activation de mod_rewrite et configuration d'AllowOverride
RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf && \
    sed -i '/<Directory "\/usr\/local\/apache2\/htdocs">/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /usr/local/apache2/conf/httpd.conf

EXPOSE 80
