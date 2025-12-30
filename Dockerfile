# ==========================================
# Stage 1: Builder - Compilation de l'app
# ==========================================
FROM node:20-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer toutes les dépendances (dev + prod)
RUN npm ci

# Copier tout le code source
COPY . .

# Compiler l'application TypeScript
RUN npm run build

# ==========================================
# Stage 2: Production - Image finale légère
# ==========================================
FROM node:20-alpine AS production

# Définir le répertoire de travail
WORKDIR /app

# Copier uniquement les fichiers nécessaires depuis le builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Exposer le port 3000
EXPOSE 3000

# Variable d'environnement pour la production
ENV NODE_ENV=production

# Commande pour démarrer l'application
CMD ["node", "dist/main.js"]
