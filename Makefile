BASE = github.com/mkadiri
IMAGE = frontend-microservice
TAG = local

build:
	docker build --no-cache -t ${BASE}/${IMAGE}:${TAG} .

up:
	docker-compose down && docker-compose up -d

run:
	docker run -v ${PWD}/app:/app -ti node:15-alpine3.13 sh

logs:
	docker logs -f ${IMAGE}