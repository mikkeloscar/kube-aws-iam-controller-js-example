FROM node:12-alpine

WORKDIR /app

COPY package*.json .
COPY app.js .

RUN yarn install

ENTRYPOINT node app.js
