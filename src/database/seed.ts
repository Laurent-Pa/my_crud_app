import { DataSource } from 'typeorm';
import { seedClients } from './seeds/client.seeder';
import { seedCommandes } from './seeds/commande.seeder';
// Import des autres seeders à ajouter plus tard
// import { seedPlats } from './seeds/plat.seeder';
// import { seedTables } from './seeds/table.seeder';

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

    // Exécuter les seeds dans l'ordre
    await seedClients(dataSource);
    // await seedPlats(dataSource);
    // await seedTables(dataSource);
    // await seedReservations(dataSource);
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
