FROM node:8.9.4

VOLUME [ "/backend", "/browserified", "/config", "/html", "/pyrrha-abi" ]

COPY ./package.json /package.json

WORKDIR /
RUN npm i --production --quiet

CMD [ "npm", "start" ]

EXPOSE 8081
