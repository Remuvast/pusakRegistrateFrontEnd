# Etapa de Construcción
FROM node:18 AS build
WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias y Angular CLI versión 18
RUN npm install -g @angular/cli@18
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construcción de producción del proyecto Angular
RUN npm run build --configuration=production --project=pusak-register

# Etapa de Producción con Nginx
FROM nginx:alpine
COPY --from=build /app/dist/pusak-register /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
