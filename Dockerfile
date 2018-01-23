FROM node:8.9.4

COPY ./package.json /package.json

WORKDIR /
RUN npm i --production --quiet

CMD [ "npm", "start" ]

EXPOSE 8081
