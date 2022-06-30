FROM node:current-alpine3.16

WORKDIR /usr/src/app

RUN apk update && apk add --no-cache supervisor

COPY ./package.json ./yarn.lock ./
COPY ./supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN yarn install

CMD ["/usr/bin/supervisord"]
