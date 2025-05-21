# Variables
SERVICE_NAME=angular-app
DOCKER_COMPOSE=docker-compose
PORT=4200

# Construye los servicios usando docker-compose
build:
	@echo "🔧 Construyendo imagen con Docker Compose..."
	$(DOCKER_COMPOSE) build

# Levanta el servicio en segundo plano
up:
	@echo "🚀 Levantando el frontend en http://localhost:$(PORT)"
	$(DOCKER_COMPOSE) up -d

# Detiene los contenedores
down:
	@echo "🛑 Deteniendo servicios..."
	$(DOCKER_COMPOSE) down

# Reinicia el contenedor
restart: down up

# Verifica estado de los contenedores
status:
	$(DOCKER_COMPOSE) ps

# Muestra logs en tiempo real
logs:
	$(DOCKER_COMPOSE) logs -f $(SERVICE_NAME)

# Limpia contenedores, redes, y volúmenes (¡cuidado!)
clean: down
	@echo "🧹 Limpiando volúmenes..."
	$(DOCKER_COMPOSE) down -v --remove-orphans

# Ayuda
help:
	@echo "🛠️  Comandos disponibles:"
	@echo "  make build     👉 Construye la imagen del frontend"
	@echo "  make up        👉 Inicia el contenedor en http://localhost:$(PORT)"
	@echo "  make down      👉 Detiene y elimina los contenedores"
	@echo "  make restart   👉 Reinicia el contenedor"
	@echo "  make status    👉 Muestra estado de los servicios"
	@echo "  make logs      👉 Muestra logs del servicio frontend"
	@echo "  make clean     👉 Elimina volúmenes y contenedores"
