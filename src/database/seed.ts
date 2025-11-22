import { DataSource } from 'typeorm';
import { seedClients } from './seeds/client.seeder';
import { seedPlats } from './seeds/plat.seeder';
import { seedTables } from './seeds/table.seeder';
import { seedReservations } from './seeds/reservation.seeder';
import { seedCommandes } from './seeds/commande.seeder';

// Fonction pour nettoyer toutes les tables dans le bon ordre
async function clearAllTables(dataSource: DataSource) {
  const queryRunner = dataSource.createQueryRunner();
  
  try {
    // Désactiver temporairement les contraintes de clés étrangères
    await queryRunner.query('SET session_replication_role = replica;');
    
    // Vider les tables dans l'ordre inverse des dépendances
    await queryRunner.query('TRUNCATE TABLE "commandes" RESTART IDENTITY CASCADE;');
    await queryRunner.query('TRUNCATE TABLE "reservations" RESTART IDENTITY CASCADE;');
    await queryRunner.query('TRUNCATE TABLE "tables" RESTART IDENTITY CASCADE;');
    await queryRunner.query('TRUNCATE TABLE "plats" RESTART IDENTITY CASCADE;');
    await queryRunner.query('TRUNCATE TABLE "clients" RESTART IDENTITY CASCADE;');
    
    // Réactiver les contraintes de clés étrangères
    await queryRunner.query('SET session_replication_role = DEFAULT;');
    
    console.log('🧹 Toutes les tables ont été vidées\n');
  } finally {
    await queryRunner.release();
  }
}

async function runSeeds() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['src/entities/*.entity.ts'],
    synchronize: false,
  });

  try {
    await dataSource.initialize();
    console.log('✅ Connexion à la base établie\n');

    // Nettoyer toutes les tables avant de seeder
    await clearAllTables(dataSource);

    // Exécuter les seeds dans l'ordre
    await seedClients(dataSource);
    await seedPlats(dataSource);
    await seedTables(dataSource);
    await seedReservations(dataSource);
    await seedCommandes(dataSource);

    await dataSource.destroy();
    console.log('\n✅ Tous les seeds ont été exécutés avec succès');
  } catch (error) {
    console.error('❌ Erreur lors du seeding:', error);
    await dataSource.destroy();
    process.exit(1);
  }
}

runSeeds();
