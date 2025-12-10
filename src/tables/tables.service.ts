// src/tables/tables.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { StatutTable, Table } from './table.types';

@Injectable()
export class TablesService {
  // Hard coded data (temporary)
  private tables: Table[] = [
    {
      id: 1,
      capacite: 4,
      statut: StatutTable.LIBRE,
    },
    {
      id: 2,
      capacite: 2,
      statut: StatutTable.OCCUPEE,
    },
    {
      id: 3,
      capacite: 6,
      statut: StatutTable.RESERVEE,
    },
  ];
  private nextId = 4;

  findAll(): Table[] {
    return this.tables;
  }

  findOne(id: number): Table {
    const table = this.tables.find((t) => t.id === id);
    if (!table) throw new NotFoundException(`Table #${id} non trouvée`);
    return table;
  }

  create(capacite: number, statut: StatutTable = StatutTable.LIBRE): Table {
    const nouvelleTable: Table = {
      id: this.nextId++,
      capacite,
      statut,
    };
    this.tables.push(nouvelleTable);
    return nouvelleTable;
  }

  update(id: number, capacite?: number, statut?: StatutTable): Table {
    const table = this.findOne(id);
    if (capacite !== undefined) table.capacite = capacite;
    if (statut !== undefined) table.statut = statut;
    return table;
  }

  remove(id: number): void {
    const index = this.tables.findIndex((t) => t.id === id);
    if (index === -1) throw new NotFoundException(`Table #${id} non trouvée`);
    this.tables.splice(index, 1);
  }
}
