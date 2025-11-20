import { DataSource } from 'typeorm';
import { Commande } from '../../entities/commande.entity';

export async function seedCommandes(dataSource: DataSource) {
    const commandeRepository = dataSource.getRepository(Commande);

    const commandes = [
        {
            clientId: 1,
            tableId: 1,
            platId: 1,
            prixTotal: 12.50, // ex: prix du plat 1
        },
        {
            clientId: 2,
            tableId: 2,
            platId: 3,
            prixTotal: 18.00,
        },
        {
            clientId: 3,
            tableId: 1,
            platId: 2,
            prixTotal: 15.90,
        },
        {
            clientId: 1,
            tableId: 3,
            platId: 4,
            prixTotal: 22.00,
        },
    ];

    for (const data of commandes) {
        const commande = commandeRepository.create(data);
        await commandeRepository.save(commande);
    }

    console.log(`✅ ${commandes.length} commandes créées`);
}
