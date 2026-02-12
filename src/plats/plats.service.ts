// src/plats/plats.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';

// Interface for the dishes
interface Plat {
  id: number;
  nom: string;
  prix: number;
  description: string;
  allergenes: string[];
  vegetarien: boolean;
}

@Injectable()
export class PlatsService {
  // Hard coded data to compensate DB removed, temporary solution before mock
  private plats: Plat[] = [
    {
      id: 1,
      nom: 'Burger Classique',
      prix: 12.5,
      description: 'Pain, steak, salade, tomate',
      allergenes: ['gluten'],
      vegetarien: false,
    },
    {
      id: 2,
      nom: 'Salade César',
      prix: 9.5,
      description: 'Salade romaine, croûtons, parmesan',
      allergenes: ['gluten', 'lactose'],
      vegetarien: true,
    },
    {
      id: 3,
      nom: 'Test',
      prix: 9.5,
      description: 'Salade romaine, croûtons, parmesan',
      allergenes: ['gluten', 'lactose'],
      vegetarien: true,
    },
  ];
  private nextId = 3; // Generate new ids

  findAll(): Plat[] {
    return this.plats;
  }

  findOne(id: number): Plat {
    const plat = this.plats.find((p) => p.id === id);
    if (!plat) throw new NotFoundException(`Plat #${id} non trouvé`);
    return plat;
  }

  create(
    nom: string,
    prix: number,
    description: string,
    allergenes: string[],
    vegetarien: boolean,
  ): Plat {
    const nouveauPlat: Plat = {
      id: this.nextId++,
      nom,
      prix,
      description,
      allergenes: allergenes || [],
      vegetarien: vegetarien || false,
    };
    this.plats.push(nouveauPlat);
    return nouveauPlat;
  }

  update(
    id: number,
    nom?: string,
    prix?: number,
    description?: string,
    allergenes?: string[],
    vegetarien?: boolean,
  ): Plat {
    const plat = this.findOne(id);
    if (nom !== undefined) plat.nom = nom;
    if (prix !== undefined) plat.prix = prix;
    if (description !== undefined) plat.description = description;
    if (allergenes !== undefined) plat.allergenes = allergenes;
    if (vegetarien !== undefined) plat.vegetarien = vegetarien;
    return plat;
  }

  remove(id: number): void {
    const index = this.plats.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundException(`Plat #${id} non trouvé`);
    this.plats.splice(index, 1);
  }
}
