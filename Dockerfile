FROM node:15-alpine3.13

RUN apk add --update --no-cache git && \
    npm install -g @angular/cli@10.1.3

COPY entrypoint.sh /entrypoint.sh
COPY app /app

WORKDIR /app

RUN npm install

EXPOSE 4200

ENTRYPOINT ["sh", "/entrypoint.sh"]