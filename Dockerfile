FROM node:9

COPY ./package.json /package.json
COPY ./js /js
COPY ./html /html
COPY ./config /config
COPY ./backend /backend

WORKDIR /
RUN git clone https://github.com/pandoraboxchain/pyrrha-abi ./pyrrha-abi
RUN npm i --production --quiet
RUN npm i pm2 -g --quiet
RUN npm i browserify -g --quiet
RUN mkdir ./browserified
RUN npm run bundle

EXPOSE 8081

CMD ["pm2-docker", "start", "backend/pm2.config.json"]
