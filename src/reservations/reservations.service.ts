// src/reservations/reservations.service.ts
import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../entities/reservation.entity';
import { StatutTable } from '../entities/table.entity';
import { ClientsService } from '../clients/clients.service';
import { TablesService } from '../tables/tables.service';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @Inject(forwardRef(() => ClientsService))
    private readonly clientsService: ClientsService,
    @Inject(forwardRef(() => TablesService))
    private readonly tablesService: TablesService,
  ) {}

  findAll(): Promise<Reservation[]> {
    return this.reservationRepository.find({
      relations: ['client', 'table'],
    });
  }

  async findOne(id: number): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
      relations: ['client', 'table'],
    });
    if (!reservation)
      throw new NotFoundException(`Réservation #${id} non trouvée`);
    return reservation;
  }

  async create(clientId: number, tableId: number): Promise<Reservation> {
    // Vérifier que le client existe
    await this.clientsService.findOne(clientId);

    // Vérifier que la table existe
    const table = await this.tablesService.findOne(tableId);

    // Vérifier que la table est libre ou réservée
    if (table.statut === StatutTable.OCCUPEE) {
      throw new Error(`La table #${tableId} est actuellement occupée`);
    }

    const nouvelleReservation = this.reservationRepository.create({
      clientId,
      tableId,
    });
    const saved = await this.reservationRepository.save(nouvelleReservation);

    // Mettre à jour le statut de la table
    await this.tablesService.update(tableId, undefined, StatutTable.RESERVEE);

    return this.findOne(saved.id);
  }

  async update(
    id: number,
    clientId?: number,
    tableId?: number,
  ): Promise<Reservation> {
    const reservation = await this.findOne(id);

    if (clientId !== undefined) {
      await this.clientsService.findOne(clientId);
      reservation.clientId = clientId;
    }

    if (tableId !== undefined) {
      await this.tablesService.findOne(reservation.tableId);
      await this.tablesService.update(reservation.tableId, undefined, StatutTable.LIBRE);

      const nouvelleTable = await this.tablesService.findOne(tableId);
      if (nouvelleTable.statut === StatutTable.OCCUPEE) {
        throw new Error(`La table #${tableId} est actuellement occupée`);
      }
      reservation.tableId = tableId;
      await this.tablesService.update(tableId, undefined, StatutTable.RESERVEE);
    }

    await this.reservationRepository.save(reservation);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const reservation = await this.findOne(id);

    // Libérer la table
    await this.tablesService.update(reservation.tableId, undefined, StatutTable.LIBRE);

    await this.reservationRepository.remove(reservation);
  }
}
