// src/entities/table.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Reservation } from './reservation.entity';
import { Commande } from './commande.entity';

export enum StatutTable {
  LIBRE = 'libre',
  OCCUPEE = 'occupée',
  RESERVEE = 'réservée',
}

@Entity('tables')
export class Table {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  capacite: number;

  @Column({
    type: 'enum',
    enum: StatutTable,
    default: StatutTable.LIBRE,
  })
  statut: StatutTable;

  @OneToMany(() => Reservation, (reservation) => reservation.table)
  reservations: Reservation[];

  @OneToMany(() => Commande, (commande) => commande.table)
  commandes: Commande[];
}
