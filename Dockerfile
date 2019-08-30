FROM node:carbon-alpine

WORKDIR /app

ADD . /app

RUN npm install

RUN npm install -g @quasar/cli

EXPOSE 8082

ENV NODE_ENV=development

RUN mv ./init.sh /usr/bin/setup

RUN ["chmod", "+x", "/usr/bin/setup"]

CMD setup