// src/tables/table.types.ts
export enum StatutTable {
  LIBRE = 'LIBRE',
  OCCUPEE = 'OCCUPEE',
  RESERVEE = 'RESERVEE',
}

export interface Table {
  id: number;
  capacite: number;
  statut: StatutTable;
}
