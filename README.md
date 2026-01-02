# 🍽️ My CRUD App - Restaurant Management API

Application de gestion de restaurant développée avec NestJS. Cette application permet de gérer les clients, plats, tables, réservations et commandes avec des données en mémoire (stateless).

## 🎯 Projet

Application développée dans le cadre d'un cours sur les **services cloud** et les pratiques **DevOps modernes**.

### Objectifs pédagogiques
- ✅ Architecture stateless (données en mémoire)
- ✅ Conteneurisation avec Docker
- ✅ CI/CD avec GitHub Actions et Google Cloud Build
- ✅ Déploiement automatique sur Google Cloud Run
- ✅ Infrastructure as Code avec substitutions variables

### Contexte
Ce projet est un **fork d'un projet collaboratif** développé en équipe de 4 personnes. La version actuelle a été adaptée pour répondre aux exigences spécifiques du cours de services cloud, avec une migration de l'architecture database vers une architecture stateless.

---

## 🏗️ Architecture

### Stateless Application
- **Pas de base de données** : Données stockées en mémoire
- **Réinitialisation au redémarrage** : Données perdues à chaque déploiement
- **Cloud-ready** : Conçu pour le déploiement serverless

### Stack technique
- **Backend** : NestJS (Node.js 20.x + TypeScript)
- **Conteneurisation** : Docker (multi-stage build)
- **CI** : GitHub Actions
- **CD** : Google Cloud Build
- **Hébergement** : Google Cloud Run
- **Registry** : Google Artifact Registry

---

## 🚀 Déploiement automatique

### Pipeline CI/CD
```
Code push → GitHub
    ↓
GitHub Actions (CI)
    ├─ npm ci
    ├─ npm run build
    └─ npm test ✅
    ↓
Pull Request mergé dans main
    ↓
Google Cloud Build (CD)
    ├─ Docker build
    ├─ Push vers Artifact Registry
    └─ Deploy sur Cloud Run ✅
    ↓
Application accessible publiquement
```

## 📋 Prérequis

Avant d'installer l'application, assurez-vous d'avoir installé :

- **Node.js** (version 20 ou supérieure) - [Télécharger Node.js](https://nodejs.org/)
- **npm** (généralement inclus avec Node.js)
- **Docker** (pour la containerisation) - [Télécharger Docker](https://www.docker.com/get-started)

---

## 🔧 Installation et lancement local

### Étape 1 : Cloner le projet
```bash
git clone https://github.com/Laurent-Pa/my_crud_app.git
cd my_crud_app
```

### Étape 2 : Installer les dépendances Node.js
```bash
npm install
```

Cette commande installera toutes les dépendances nécessaires listées dans `package.json`.

---

## 🚀 Lancement de l'application

### Option A : En local (développement)

#### Mode développement (avec rechargement automatique)
```bash
npm run start:dev
```

L'application sera accessible sur `http://localhost:3000`

#### Mode production

D'abord, compilez l'application :
```bash
npm run build
```

Puis lancez-la :
```bash
npm run start:prod
```

---

### Option B : Avec Docker (recommandé)

#### 1. Construire l'image Docker
```bash
docker build -t my-crud-app:latest .
```

#### 2. Lancer le conteneur
```bash
docker run -d -p 3000:3000 --name my-crud-app my-crud-app:latest
```

#### 3. Vérifier que le conteneur tourne
```bash
docker ps
```

#### 4. Tester l'application
```bash
curl http://localhost:3000/health
```

Vous devriez voir :
```json
{
  "status": "ok",
  "timestamp": "2025-01-02T...",
  "service": "restaurant-api"
}
```

#### Commandes Docker utiles
```bash
# Voir les logs du conteneur
docker logs my-crud-app

# Arrêter le conteneur
docker stop my-crud-app

# Redémarrer le conteneur
docker start my-crud-app

# Supprimer le conteneur
docker rm my-crud-app

# Supprimer l'image
docker rmi my-crud-app:latest
```

---

## 🌿 Workflow Git et CI/CD

### Stratégie de branches
- **main** - Branche principale stable, protégée par les tests automatiques
- **feat/\*** - Branches de fonctionnalités
- **fix/\*** - Branches de corrections
- **docs/\*** - Branches de documentation

### Workflow de développement
1. Créez une branche pour chaque fonctionnalité : `git checkout -b feat/nom-feature`
2. Développez et faites des commits réguliers avec des messages explicites
3. Poussez votre branche : `git push origin feat/nom-feature`
4. Créez une Pull Request vers `main`
5. **GitHub Actions lance automatiquement** :
   - Installation des dépendances
   - Compilation TypeScript
   - Tests unitaires
6. Si les tests passent ✅ → Merge autorisé
7. Après le merge dans `main` → **Déploiement automatique** sur Cloud Run

### Protection de la branche main
- ✅ Tests automatiques obligatoires (GitHub Actions)
- ✅ Déploiement automatique après merge réussi
- ✅ Historique Git propre avec squash merge

---

## 📚 Structure de l'application

L'application est organisée en modules NestJS :

- **Clients** (`/clients`) - Gestion des clients du restaurant
- **Plats** (`/plats`) - Gestion de la carte des plats
- **Tables** (`/tables`) - Gestion des tables
- **Réservations** (`/reservations`) - Gestion des réservations
- **Commandes** (`/commandes`) - Gestion des commandes

⚠️ **Note importante** : L'application utilise des **données en mémoire**. Toutes les données sont réinitialisées à chaque redémarrage de l'application.

---

## 🔌 Endpoints de l'API

### Health Check

- `GET /health` - Vérification de l'état de l'application
- `GET /` - Informations générales sur l'application

### Clients

- `GET /clients` - Liste tous les clients
- `GET /clients/:id` - Récupère un client par son ID
- `POST /clients` - Crée un nouveau client
- `PUT /clients/:id` - Modifie un client
- `DELETE /clients/:id` - Supprime un client

### Plats

- `GET /plats` - Liste tous les plats
- `GET /plats/:id` - Récupère un plat par son ID
- `POST /plats` - Crée un nouveau plat
- `PUT /plats/:id` - Modifie un plat
- `DELETE /plats/:id` - Supprime un plat

### Tables

- `GET /tables` - Liste toutes les tables
- `GET /tables/:id` - Récupère une table par son ID
- `POST /tables` - Crée une nouvelle table
- `PUT /tables/:id` - Modifie une table
- `DELETE /tables/:id` - Supprime une table

### Réservations

- `GET /reservations` - Liste toutes les réservations
- `GET /reservations/:id` - Récupère une réservation par son ID
- `POST /reservations` - Crée une nouvelle réservation
- `PUT /reservations/:id` - Modifie une réservation
- `DELETE /reservations/:id` - Supprime une réservation

### Commandes

- `GET /commandes` - Liste toutes les commandes
- `GET /commandes/:id` - Récupère une commande par son ID
- `POST /commandes` - Crée une nouvelle commande
- `PUT /commandes/:id` - Modifie une commande
- `DELETE /commandes/:id` - Supprime une commande

---

## 📝 Exemple d'utilisation

### Créer un client
```bash
POST http://localhost:3000/clients
Content-Type: application/json

{
  "nom": "Jean Dupont",
  "allergies": ["gluten", "lactose"],
  "majeur": true,
  "vegetarien": false
}
```

### Créer un plat
```bash
POST http://localhost:3000/plats
Content-Type: application/json

{
  "nom": "Pizza Margherita",
  "prix": 12.50,
  "description": "Pizza avec tomate, mozzarella et basilic",
  "allergenes": ["gluten", "lactose"],
  "vegetarien": true
}
```

### Créer une table
```bash
POST http://localhost:3000/tables
Content-Type: application/json

{
  "capacite": 4,
  "statut": "LIBRE"
}
```

---

## 🛠️ Scripts disponibles

- `npm run start:dev` - Lance l'application en mode développement (avec watch)
- `npm run start` - Lance l'application
- `npm run start:prod` - Lance l'application en mode production
- `npm run build` - Compile l'application TypeScript
- `npm run lint` - Vérifie le code avec ESLint
- `npm run format` - Formate le code avec Prettier
- `npm run test` - Lance les tests unitaires
- `npm run test:e2e` - Lance les tests end-to-end

---

## 🧪 Tests

[![CI Tests](https://github.com/Laurent-Pa/my_crud_app/actions/workflows/ci-tests.yml/badge.svg)](https://github.com/Laurent-Pa/my_crud_app/actions/workflows/ci-tests.yml)

L'application inclut des tests unitaires pour certains services.

### Lancer les tests
```bash
npm run test
```

### Voir la couverture de code
```bash
npm run test:cov
```

### Tests en mode watch
```bash
npm run test:watch
```

### Status des tests
**Note** : Certains tests TypeORM ont été temporairement désactivés suite à la migration vers l'architecture stateless. Les tests passants couvrent les contrôleurs et les services critiques.

---

## 💾 Stockage des données

L'application utilise un **stockage en mémoire** pour toutes les entités. Les données sont initialisées au démarrage avec quelques exemples et sont **perdues à chaque redémarrage**.

### Données d'exemple disponibles au démarrage

- **2 clients** : Dupont Jean, Martin Sophie
- **2 plats** : Burger Classique, Salade César
- **3 tables** : Capacités de 2, 4 et 6 personnes
- **1 réservation** : Client 1 à la table 3
- **1 commande** : Table 2, Client 1, Plat 1

---

## 🐳 Architecture Docker

L'application utilise un **Dockerfile multi-stage** optimisé :

### Stage 1 : Builder
- Installation des dépendances
- Compilation du code TypeScript

### Stage 2 : Production
- Image légère basée sur `node:20-alpine`
- Copie uniquement des fichiers nécessaires
- Taille optimisée de l'image finale (~90 MB)

---


### Déploiement
```bash
# Build l'image Docker, push vers Artifact Registry et déploy sur Cloud Run
gcloud builds submit --config=cloudbuild.yaml .
```

---

## ⚠️ Dépannage

### Port 3000 déjà utilisé

Si le port 3000 est déjà utilisé, modifiez le port dans `src/main.ts` :
```typescript
await app.listen(3001); // Au lieu de 3000
```

Ou arrêtez les autres conteneurs Docker :
```bash
docker ps
docker stop <container-name>
```

### Problèmes Docker
```bash
# Voir tous les conteneurs (même arrêtés)
docker ps -a

# Nettoyer les conteneurs arrêtés
docker container prune

# Nettoyer les images inutilisées
docker image prune
```

---

## 📖 Documentation de l'API

L'application expose une documentation interactive Swagger :

- **Documentation Swagger (local)** : `http://localhost:3000`

Vous pouvez tester tous les endpoints directement depuis l'interface Swagger.

---

## 📝 Changelog

### v2.0.0 - Architecture Cloud-Native (Janvier 2026)
- ✅ Migration vers architecture stateless
- ✅ Suppression de PostgreSQL/TypeORM
- ✅ Données en mémoire
- ✅ Conteneurisation Docker multi-stage
- ✅ CI/CD avec GitHub Actions
- ✅ Déploiement automatique sur Cloud Run via Cloud Build
- ⚠️ Tests TypeORM temporairement désactivés

### v1.0.0 - Version initiale (Décembre 2025)
- ✅ CRUD complet avec NestJS
- ✅ Base de données PostgreSQL
- ✅ TypeORM pour l'ORM
- ✅ Développement collaboratif en équipe de 4

---


## 📄 Licence

Ce projet est sous licence MIT.

---

## 👥 Contributeurs

### Équipe originale (v1.0.0)
Projet collaboratif développé en équipe de 4 personnes.

### Adaptation Cloud-Native (v2.0.0)
**Laurent Pa** - Migration vers architecture cloud et mise en place du CI/CD
- GitHub : [@Laurent-Pa](https://github.com/Laurent-Pa)
- Contexte : Cours Services Cloud - EPSI Nantes

---
