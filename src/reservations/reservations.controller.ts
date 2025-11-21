// src/reservations/reservations.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { Reservation } from '../entities/reservation.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';


@Controller('reservations')
@ApiTags('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  @ApiOperation({ summary: 'Liste toutes les réservations' })
  @ApiResponse({ status: 200, description: 'Liste des réservations' })
  findAll(): Promise<Reservation[]> {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère une réservation par son ID' })
  @ApiParam({ name: 'id', description: 'ID de la réservation' })
  @ApiResponse({ status: 200, description: 'Réservation trouvée' })
  @ApiResponse({ status: 404, description: 'Réservation non trouvée' })
  findOne(@Param('id') id: string): Promise<Reservation> {
    return this.reservationsService.findOne(Number(id));
  }

  @Post()
  @ApiOperation({ summary: 'Crée une nouvelle réservation' })
  @ApiResponse({ status: 201, description: 'Réservation créée avec succès' })
  @ApiBody({
    description: 'Données de la nouvelle réservation',
    schema: {
      type: 'object',
      properties: {
        clientId: { type: 'number', example: 1 },
        tableId: { type: 'number', example: 1 },
      },
    },
  })
  create(
    @Body()
    body: {
      clientId: number;
      tableId: number;
    },
  ): Promise<Reservation> {
    return this.reservationsService.create(body.clientId, body.tableId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Modifie une réservation' })
  @ApiParam({ name: 'id', description: 'ID de la réservation à modifier' })
  @ApiResponse({ status: 200, description: 'Réservation modifiée avec succès' })
  update(
    @Param('id') id: string,
    @Body()
    body: {
      clientId?: number;
      tableId?: number;
    },
  ): Promise<Reservation> {
    return this.reservationsService.update(
      Number(id),
      body.clientId,
      body.tableId,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprime une réservation' })
  @ApiParam({ name: 'id', description: 'ID de la réservation à supprimer' })
  @ApiResponse({ status: 200, description: 'Réservation supprimée avec succès' })
  async remove(@Param('id') id: string) {
    await this.reservationsService.remove(Number(id));
    return { message: `Réservation #${id} supprimée` };
  }
}
