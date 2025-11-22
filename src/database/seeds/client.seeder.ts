import { DataSource } from 'typeorm';
import { Client } from '../../entities/client.entity';

export async function seedClients(dataSource: DataSource): Promise<void> {
  const clientRepository = dataSource.getRepository(Client);

  const clients = [
    {
      nom: 'Dupont Jean',
      allergies: ['arachides', 'fruits de mer'],
      majeur: true,
      vegetarien: false,
    },
    {
      nom: 'Martin Sophie',
      allergies: [],
      majeur: true,
      vegetarien: true,
    },
    {
      nom: 'Bernard Lucas',
      allergies: ['gluten'],
      majeur: false,
      vegetarien: false,
    },
    {
      nom: 'Petit Marie',
      allergies: ['lactose', 'œufs'],
      majeur: true,
      vegetarien: true,
    },
    {
      nom: 'Durand Thomas',
      allergies: [],
      majeur: true,
      vegetarien: false,
    },
  ];

  await clientRepository.save(clients);
  console.log(`✅ ${clients.length} clients créés`);
}
