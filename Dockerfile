FROM node:20-bullseye-slim as build_stage

RUN mkdir -p /app
WORKDIR /app
RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*
RUN corepack enable \
  && corepack prepare pnpm@10.26.2 --activate
COPY frontend/package.json frontend/pnpm-lock.yaml ./
RUN pnpm install
COPY frontend .
RUN pnpm build

FROM nginx:1.16.0-alpine

COPY --from=build_stage /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
