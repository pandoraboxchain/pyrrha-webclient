FROM node:10

LABEL maintainer="kostysh@gmail.com"

COPY ./public /public
COPY ./pyrrha-consensus /pyrrha-consensus
COPY ./src /src
COPY ./config-overrides.js /config-overrides.js
COPY ./package.json /package.json
COPY ./server /server

WORKDIR /
RUN npm i pm2 -g --quiet
RUN npm i --quiet

ARG REACT_APP_WEB3_PROTOCOL=ws
ARG REACT_APP_WEB3_PORT=8546
ARG REACT_APP_WEB3_HOSTNAME=rinkeby.pandora.network
ARG REACT_APP_PAN_ADDRESS=0xf23f45caa5c697c54d2e92ecbee48855233040e1
ARG REACT_APP_MARKET_ADDRESS=0xd1feab2687c6beea17d8c1f728aaf54aed5c0ea9
ARG REACT_APP_IPFS_PROTOCOL=http
ARG REACT_APP_IPFS_HOST=ipfs.pandora.network
ARG REACT_APP_IPFS_PORT=5001
ARG REACT_APP_WEB3_RECONNECT_TIMEOUT=5000
ARG REACT_APP_WEB3_NET_ID=4

ENV REACT_APP_WEB3_PROTOCOL=$REACT_APP_WEB3_PROTOCOL
ENV REACT_APP_WEB3_PORT=$REACT_APP_WEB3_PORT
ENV REACT_APP_WEB3_HOSTNAME=$REACT_APP_WEB3_HOSTNAME
ENV REACT_APP_PAN_ADDRESS=$REACT_APP_PAN_ADDRESS
ENV REACT_APP_MARKET_ADDRESS=$REACT_APP_MARKET_ADDRESS
ENV REACT_APP_IPFS_PROTOCOL=$REACT_APP_IPFS_PROTOCOL
ENV REACT_APP_IPFS_HOST=$REACT_APP_IPFS_HOST
ENV REACT_APP_IPFS_PORT=$REACT_APP_IPFS_PORT
ENV REACT_APP_WEB3_RECONNECT_TIMEOUT=$REACT_APP_WEB3_RECONNECT_TIMEOUT
ENV REACT_APP_WEB3_NET_ID=$REACT_APP_WEB3_NET_ID

ENV NODE_ENV=production
ENV GENERATE_SOURCEMAP=false
ENV PUBLIC_URL=/

RUN npx react-app-rewired build

EXPOSE 8080

VOLUME [ "/logs" ]

CMD ["pm2-docker", "start", "server/pm2.config.json"]
