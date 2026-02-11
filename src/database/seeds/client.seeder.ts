import { DataSource } from 'typeorm';
import { Client } from '../../entities/client.entity';

export async function seedClients(dataSource: DataSource): Promise<void> {
  const clientRepository = dataSource.getRepository(Client);

  const clients = [
    {
      nom: 'KOUADIO Romaric',
      allergies: ['arachides', 'fruits de mer'],
      majeur: true,
      vegetarien: false,
    },
    {
      nom: 'Papinaud  Laurent',
      allergies: [],
      majeur: true,
      vegetarien: true,
    },
    {
      nom: 'Lamrabat Oumaima',
      allergies: ['gluten'],
      majeur: true,
      vegetarien: false,
    },
    {
      nom: 'El Asri Oumaima',
      allergies: ['lactose', 'œufs'],
      majeur: true,
      vegetarien: true,
    },
    {
      nom: 'Breton Bryan',
      allergies: [],
      majeur: true,
      vegetarien: false,
    },
  ];

  await clientRepository.save(clients);
  console.log(`✅ ${clients.length} clients créés`);
}
