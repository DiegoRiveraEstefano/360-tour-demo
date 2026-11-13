# ==============================================================================
# Stage 1: Build application
# ==============================================================================
FROM node:22-alpine AS builder

WORKDIR /app

# Enable pnpm via corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy dependency specifications and security configs
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml* .npmrc* ./

# Install dependencies respecting security supply-chain gates
RUN pnpm install --frozen-lockfile

# Copy project source and configuration
COPY . .

# Build production bundle with TypeScript checking
RUN pnpm run build

# ==============================================================================
# Stage 2: Serve static production assets via Nginx
# ==============================================================================
FROM nginx:alpine-slim AS runner

# Remove default nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
