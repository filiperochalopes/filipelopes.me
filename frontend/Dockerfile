FROM node:20-bullseye-slim

RUN mkdir -p /home/node/app
WORKDIR /home/node/app
RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*
RUN corepack enable \
  && corepack prepare pnpm@10.26.2 --activate
ENV NODE_OPTIONS=--openssl-legacy-provider
COPY package.json pnpm-lock.yaml .npmrc ./
RUN pnpm install
COPY . .
EXPOSE 3000

CMD ["pnpm", "start"]
