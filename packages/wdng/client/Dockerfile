# Build stage
FROM node:22 AS builder
RUN corepack enable && corepack prepare pnpm@10.20.0 --activate
WORKDIR /app

# Copy all source files
COPY . .

# Install dependencies and build
RUN pnpm install && pnpm build

# Production stage - serve with nginx
FROM nginx:1.28-alpine

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
