# ==========================================
# Stage 1: Builder
# Purpose: Install dependencies and build the Vite/React app
# ==========================================
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the production bundle
# Vite will create optimized, minified output in /dist
RUN npm run build

# ==========================================
# Stage 2: Production
# Purpose: Serve the static files with Nginx
# ==========================================
FROM nginx:alpine AS production

# Copy built files from builder stage to nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
# This handles:
# - SPA routing (all routes go to index.html)
# - CORS headers
# - Compression
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Nginx runs in foreground by default
CMD ["nginx", "-g", "daemon off;"]
