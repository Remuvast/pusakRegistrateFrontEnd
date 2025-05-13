# Etapa de Construcción
FROM node:18 AS build
WORKDIR /app

# Copiar el archivo de dependencias y configuraciones
COPY package*.json ./

# Instalar dependencias de Node.js y Angular
RUN npm install -g @angular/cli@13.3.0
RUN npm install

# Copiar el código fuente
COPY . .

# Construir la aplicación Angular (producción)
RUN npm run build --configuration=production --project=pusak-register

# Etapa de Producción (Nginx)
FROM nginx:alpine
COPY --from=build /app/dist/pusak-register /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
