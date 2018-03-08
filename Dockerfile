FROM node:9

COPY ./public /public
COPY ./pyrrha-abi /pyrrha-abi
COPY ./src /src
COPY ./config-overrides.js /config-overrides.js
COPY ./package.json /package.json
COPY ./server /server

WORKDIR /
RUN npm i pm2 -g --quiet
RUN npm i --quiet

ENV GENERATE_SOURCEMAP=false
RUN npm run build

EXPOSE 8080

VOLUME [ "/logs" ]

CMD ["pm2-docker", "start", "server/pm2.config.json"]
