FROM node:14.14.0 as build_stage

WORKDIR /app
COPY package.json .
COPY .env.docker .env
RUN yarn
COPY . .
RUN yarn build

FROM nginx:1.16.0-alpine

COPY --from=build_stage /app/build /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]