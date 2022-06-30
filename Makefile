DOCKER=docker
COMPOSE=docker-compose -f docker-compose.yml
EXEC=$(COMPOSE) exec app

start:
	make rm
	make up
	make sync-dependencies
	@echo Ready!

up:
	$(COMPOSE) kill
	$(COMPOSE) build --force-rm
	$(COMPOSE) up -d

stop:
	$(COMPOSE) stop
	$(COMPOSE) kill

rm:
	$(COMPOSE) kill
	$(COMPOSE) rm --force

down:
	$(COMPOSE) down -v --rmi 'all'

ssh:
	$(EXEC) sh

yarn:
	$(EXEC) yarn install

yarn-sync: yarn sync-dependencies

sync-dependencies:
	@echo Syncing dependencies...
ifeq ($(OS)$(SHELL),Windows_NTsh.exe)
	if exist node_modules rmdir node_modules /S /Q
else
	rm -rf node_modules
endif
	mkdir node_modules
	$(DOCKER) cp svelte-chat-app:/usr/src/app/node_modules ./
	@echo Dependencies synced!
