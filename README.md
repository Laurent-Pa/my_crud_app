@@ -1,257 +0,0 @@
# 🍽️ Application CRUD Restaurant

Application de gestion de restaurant développée avec NestJS et PostgreSQL. Cette application permet de gérer les clients, plats, tables, réservations et commandes.

## 📋 Prérequis

Avant d'installer l'application, assurez-vous d'avoir installé :

- **Node.js** (version 18 ou supérieure) - [Télécharger Node.js](https://nodejs.org/)
- **PostgreSQL** (version 12 ou supérieure) - [Télécharger PostgreSQL](https://www.postgresql.org/download/)
- **npm** (généralement inclus avec Node.js) ou **yarn**

## 🚀 Installation

### Étape 1 : Cloner le projet (si nécessaire)

Si vous avez cloné le projet depuis un dépôt Git, passez directement à l'étape 2.

### Étape 2 : Installer les dépendances Node.js

Ouvrez un terminal dans le dossier du projet et exécutez :

```bash
npm install
```

Cette commande installera toutes les dépendances nécessaires listées dans `package.json`.

### Étape 3 : Installer et configurer PostgreSQL

#### Option A : Installation locale de PostgreSQL

1. **Téléchargez et installez PostgreSQL** depuis [postgresql.org](https://www.postgresql.org/download/)
2. **Notez le mot de passe** que vous définissez pour l'utilisateur `postgres` lors de l'installation
3. **Créez la base de données** :
   - Ouvrez pgAdmin ou connectez-vous via psql :
   ```bash
   psql -U postgres
   ```
   - Créez la base de données :
   ```sql
   CREATE DATABASE restaurant;
   ```
   - Quittez psql :
   ```sql
   \q
   ```

#### Option B : Utiliser Docker (recommandé pour le développement)

Si vous avez Docker installé, vous pouvez lancer PostgreSQL avec :

```bash
docker run --name postgres-restaurant -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=restaurant -p 5432:5432 -d postgres
```

### Étape 4 : Configurer les variables d'environnement

**💡 Conseil :** Un fichier `.env.example` est fourni comme modèle. Copiez-le :
```bash
cp .env.example .env
```

Puis modifiez les valeurs selon votre configuration.

Créez un fichier `.env` à la racine du projet avec le contenu suivant :
```env
# Configuration de la base de données PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME= #votre nom d'administrateur
DB_PASSWORD= #votre mot de passe d'administrateur
DB_NAME=restaurant

# Environnement
NODE_ENV=development
```

**⚠️ Important :** Modifiez `DB_PASSWORD` avec le mot de passe PostgreSQL que vous avez configuré à l'étape 3.

### Étape 5 : Lancer l'application

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

# 🌿 Workflow Git et Collaboration
- **main** - Branche principale stable
- Créez une branche pour chaque fonctionnalité : `git checkout -b feature-nom`
- Faites régulièrement des commits avec une description explicite SVP
- Faites des pull requests pour merger dans main

## 📚 Structure de l'application

L'application est organisée en modules NestJS :

- **Clients** (`/clients`) - Gestion des clients du restaurant
- **Plats** (`/plats`) - Gestion de la carte des plats
- **Tables** (`/tables`) - Gestion des tables
- **Réservations** (`/reservations`) - Gestion des réservations
- **Commandes** (`/commandes`) - Gestion des commandes

### Étape 6 : Initialiser la base avec des données de test (optionnel)

Pour peupler la base de données avec des données d'exemple :
```bash
npm run seed
```

Cette commande créera des clients, plats, tables, etc. de démonstration.

## 🔌 Endpoints de l'API

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
  "statut": "libre"
}
```

## 🛠️ Scripts disponibles

- `npm run start:dev` - Lance l'application en mode développement (avec watch)
- `npm run start` - Lance l'application
- `npm run start:prod` - Lance l'application en mode production
- `npm run build` - Compile l'application TypeScript
- `npm run lint` - Vérifie le code avec ESLint
- `npm run format` - Formate le code avec Prettier
- `npm run test` - Lance les tests unitaires
- `npm run test:e2e` - Lance les tests end-to-end

## 🧪 Tests

L'application inclut des tests unitaires pour tous les services.

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

## 🗄️ Base de données

L'application utilise TypeORM pour gérer la base de données PostgreSQL. Les tables sont créées automatiquement au démarrage de l'application en mode développement grâce à la synchronisation automatique.

### Schéma de base de données

- **clients** - Informations des clients (nom, allergies, majeur, végétarien)
- **plats** - Carte des plats (nom, prix, description, allergènes, végétarien)
- **tables** - Tables du restaurant (capacité, statut)
- **reservations** - Réservations (client, table)
- **commandes** - Commandes (date, client, table, plat, prix total)

## ⚠️ Dépannage

### Erreur de connexion à PostgreSQL

1. Vérifiez que PostgreSQL est bien démarré :
   ```bash
   # Windows
   services.msc (chercher PostgreSQL)

   # Linux/Mac
   sudo systemctl status postgresql
   ```

2. Vérifiez vos identifiants dans le fichier `.env`

3. Testez la connexion :
   ```bash
   psql -U postgres -d restaurant
   ```

### Si Port 3000 déjà utilisé

Modifiez le port dans `src/main.ts` ou utilisez une variable d'environnement :

```env
PORT=3001
```

## 📖 Documentation de l'API

L'application expose une documentation interactive Swagger :

- **Documentation Swagger** : `http://localhost:3000`

Vous pouvez tester tous les endpoints directement depuis l'interface Swagger.

## 📄 Licence

Ce projet est sous licence MIT.

## 👨‍💻 Auteur

Application développée avec NestJS, TypeORM et PostgreSQL.
