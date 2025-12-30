FROM node:16-alpine

RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY package.json .
COPY . . 
EXPOSE 3000

CMD ["yarn", "start"]