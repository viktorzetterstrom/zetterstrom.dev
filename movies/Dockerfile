FROM node:18-alpine
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod
EXPOSE 7000
COPY . .
CMD ["pnpm", "start"]
