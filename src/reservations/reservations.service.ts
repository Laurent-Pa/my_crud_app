// src/reservations/reservations.service.ts
import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { StatutTable } from '../tables/table.types';
import { ClientsService } from '../clients/clients.service';
import { TablesService } from '../tables/tables.service';

// Interface pour typer nos réservations
interface Reservation {
  id: number;
  clientId: number;
  tableId: number;
}

@Injectable()
export class ReservationsService {
  constructor(
    @Inject(forwardRef(() => ClientsService))
    private readonly clientsService: ClientsService,
    @Inject(forwardRef(() => TablesService))
    private readonly tablesService: TablesService,
  ) {}

  // Données en mémoire
  private reservations: Reservation[] = [
    {
      id: 1,
      clientId: 1,
      tableId: 3,
    },
  ];
  private nextId = 2;

  findAll(): Reservation[] {
    return this.reservations;
  }

  findOne(id: number): Reservation {
    const reservation = this.reservations.find((r) => r.id === id);
    if (!reservation)
      throw new NotFoundException(`Réservation #${id} non trouvée`);
    return reservation;
  }

  create(clientId: number, tableId: number): Reservation {
    // Vérifier que le client existe
    this.clientsService.findOne(clientId);

    // Vérifier que la table existe
    const table = this.tablesService.findOne(tableId);

    // Vérifier que la table est libre ou réservée
    if (table.statut === StatutTable.OCCUPEE) {
      throw new Error(`La table #${tableId} est actuellement occupée`);
    }

    const nouvelleReservation: Reservation = {
      id: this.nextId++,
      clientId,
      tableId,
    };
    this.reservations.push(nouvelleReservation);

    // Mettre à jour le statut de la table
    this.tablesService.update(tableId, undefined, StatutTable.RESERVEE);

    return nouvelleReservation;
  }

  update(id: number, clientId?: number, tableId?: number): Reservation {
    const reservation = this.findOne(id);

    if (clientId !== undefined) {
      this.clientsService.findOne(clientId);
      reservation.clientId = clientId;
    }

    if (tableId !== undefined) {
      this.tablesService.findOne(reservation.tableId);
      this.tablesService.update(
        reservation.tableId,
        undefined,
        StatutTable.LIBRE,
      );

      const nouvelleTable = this.tablesService.findOne(tableId);
      if (nouvelleTable.statut === StatutTable.OCCUPEE) {
        throw new Error(`La table #${tableId} est actuellement occupée`);
      }
      reservation.tableId = tableId;
      this.tablesService.update(tableId, undefined, StatutTable.RESERVEE);
    }

    return reservation;
  }

  remove(id: number): void {
    const reservation = this.findOne(id);

    // Libérer la table
    this.tablesService.update(
      reservation.tableId,
      undefined,
      StatutTable.LIBRE,
    );

    const index = this.reservations.findIndex((r) => r.id === id);
    this.reservations.splice(index, 1);
  }
}
