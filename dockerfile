# Base image
FROM node:23-alpine AS base

WORKDIR /app

COPY package.json package-lock.json ./prisma ./
RUN npm install


COPY . .

RUN npm run build

EXPOSE 3000
ENV PORT=3000


CMD ["npm","run","dev"]

# # Dependencies layer
# FROM base AS deps
# RUN apk add --no-cache libc6-compat
# WORKDIR /app
# COPY package.json package-lock.json ./
# COPY ./prisma ./ 
# COPY .env .env
# RUN npm ci
# RUN npx prisma generate

# # Build layer
# FROM base AS builder
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .
# RUN npm run build

# # Production runtime
# FROM base AS runner
# WORKDIR /app
# ENV NODE_ENV=production

# # Create user
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# # Copy necessary files
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static

# # Set permissions
# RUN chown -R nextjs:nodejs /app
# USER nextjs

# # Expose port
# EXPOSE 3000
# ENV PORT=3000
# ENV HOSTNAME="0.0.0.0"

# # Start application
# CMD ["node", "server.js"]
