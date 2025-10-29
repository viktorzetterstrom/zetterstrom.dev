FROM node:22
RUN corepack enable && corepack prepare pnpm@10.20.0 --activate
WORKDIR /workspace

COPY pnpm-workspace.yaml pnpm-lock.yaml .npmrc package.json ./

COPY packages/recipes/package.json ./packages/recipes/
COPY packages/movies/package.json ./packages/movies/

RUN pnpm install --frozen-lockfile --ignore-scripts

COPY packages/movies ./packages/movies

WORKDIR /workspace/packages/movies
EXPOSE 7000
CMD ["pnpm", "start"]
