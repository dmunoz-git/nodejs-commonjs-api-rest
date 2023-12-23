IMAGE_NAME = nodejs-commonjs-api-rest

.PHONY: build run restart clean
build:
	docker-compose build

run:
	docker-compose up

restart:
	docker-compose down
	docker-compose up

clean:
	docker-compose down
	docker rmi $(IMAGE_NAME)_web
	docker rmi mongo
	docker rmv $(IMAGE_NAME)_mongodata
	