// src/clients/clients.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';

// Interface pour typer nos clients
interface Client {
  id: number;
  nom: string;
  allergies: string[];
  majeur: boolean;
  vegetarien: boolean;
}

@Injectable()
export class ClientsService {
  // Données en mémoire
  private clients: Client[] = [
    {
      id: 1,
      nom: 'KOUADIO Romaric',
      allergies: ['arachides', 'gluten'],
      majeur: true,
      vegetarien: false,
    },
    {
      id: 2,
      nom: 'PAPINAUD Laurent',
      allergies: [],
      majeur: true,
      vegetarien: true,
    },
    {
      id: 3,
      nom: 'LAMRABAT Oumaima',
      allergies: ['arachides', 'gluten'],
      majeur: true,
      vegetarien: false,
    },
    {
      id: 4,
      nom: 'EL ASRI Oumaima',
      allergies: ['arachides', 'gluten'],
      majeur: true,
      vegetarien: false,
    },
  ];
  private nextId = 3;

  findAll(): Client[] {
    return this.clients;
  }

  findOne(id: number): Client {
    const client = this.clients.find((c) => c.id === id);
    if (!client) throw new NotFoundException(`Client #${id} non trouvé`);
    return client;
  }

  create(
    nom: string,
    allergies: string[],
    majeur: boolean,
    vegetarien: boolean,
  ): Client {
    const nouveauClient: Client = {
      id: this.nextId++,
      nom,
      allergies: allergies || [],
      majeur: majeur || false,
      vegetarien: vegetarien || false,
    };
    this.clients.push(nouveauClient);
    return nouveauClient;
  }

  update(
    id: number,
    nom?: string,
    allergies?: string[],
    majeur?: boolean,
    vegetarien?: boolean,
  ): Client {
    const client = this.findOne(id);
    if (nom !== undefined) client.nom = nom;
    if (allergies !== undefined) client.allergies = allergies;
    if (majeur !== undefined) client.majeur = majeur;
    if (vegetarien !== undefined) client.vegetarien = vegetarien;
    return client;
  }

  remove(id: number): void {
    const index = this.clients.findIndex((c) => c.id === id);
    if (index === -1) throw new NotFoundException(`Client #${id} non trouvé`);
    this.clients.splice(index, 1);
  }
}
