My Crud App (NestJS + PostgreSQL)



🚀 Description
Application backend développée avec NestJS, proposant un CRUD simple sur des items (exemple : produits). Ce projet est utilisé comme base pour apprendre le développement cloud-native, CI/CD et déploiement sur Google Cloud Run.

📦 Installation
Cloner le projet :


git clone https://github.com/<ton-compte>/<ton-repo>.git
cd <ton-repo>


Installer les dépendances :


npm install


▶️ Lancer l’application
En mode développement :


npm run start:dev


L’API est disponible sur : 👉 http://localhost:3000

🗄️ Base de données
Le projet utilise PostgreSQL. Par défaut, la configuration est dans app.module.ts :

Host : localhost

Port : 5432

User : postgres

Password : 1234

Database : mycrudapp

Tu peux modifier ces valeurs dans le code ou via un fichier .env.

🔗 Endpoints CRUD
Méthode	Route	Description
GET	/items	Liste tous les items
GET	/items/:id	Récupère un item par id
POST	/items	Crée un nouvel item
PUT	/items/:id	Met à jour un item existant
DELETE	/items/:id	Supprime un item
📖 Documentation API
Swagger est disponible à la racine : 👉 http://localhost:3000

🧪 Tests
Lancer les tests unitaires :

npm run test

👥 Auteurs

Projet réalisé dans le cadre du module Développement et services Cloud

Équipe : 
PAPINAUD Laurent,
KOUADIO Kouassi Romaric,
EL ASRI Oumaima,
LAMRABAT Oumaima.
