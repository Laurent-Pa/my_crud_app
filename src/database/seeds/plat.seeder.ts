import { DataSource } from 'typeorm';
import { Plat } from '../../entities/plat.entity';

export async function seedPlats(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(Plat);

    const plats = [
        {
            nom: 'Spaghetti Bolognese',
            prix: 12.50,
            description: 'Pâtes fraîches avec une sauce bolognaise maison.',
            allergenes: ['gluten'],
            vegetarien: false,
        },
        {
            nom: 'Pizza Margherita',
            prix: 10.00,
            description: 'Tomates, mozzarella, basilic frais.',
            allergenes: ['lactose', 'gluten'],
            vegetarien: true,
        },
        {
            nom: 'Salade César',
            prix: 9.50,
            description: 'Laitue croquante, poulet grillé, croûtons et sauce César.',
            allergenes: ['lactose', 'oeufs', 'gluten'],
            vegetarien: false,
        },
        {
            nom: 'Burger Gourmet',
            prix: 14.00,
            description: 'Bœuf charolais, cheddar, oignons caramélisés, sauce maison.',
            allergenes: ['lactose', 'gluten'],
            vegetarien: false,
        },
        {
            nom: 'Curry de légumes',
            prix: 11.00,
            description: 'Mélange de légumes mijotés dans une sauce curry coco.',
            allergenes: [],
            vegetarien: true,
        },
    ];

    await repo.save(plats);

    console.log(`✅ ${plats.length} plats créés`);
}
