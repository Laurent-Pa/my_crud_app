# ...new file...
FROM node:18-alpine AS builder
WORKDIR /app

# Prélever package.json et lock si présent pour installer deps
COPY package*.json ./

# Installer toutes les dépendances (incluant dev) nécessaires à la build
RUN npm ci

# Copier le reste du code et builder (TypeScript -> dist)
COPY . .
RUN npm run build

# Supprimer les dépendances de dev pour ne garder que la prod
RUN npm prune --production

# Image finale plus légère
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Copier uniquement ce qui est nécessaire au runtime
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Commande de démarrage (correspond à "start:prod" dans package.json)
CMD ["node", "dist/main"]
