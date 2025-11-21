// src/commandes/commandes.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CommandesService } from './commandes.service';
import { Commande } from '../entities/commande.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('commandes')
@Controller('commandes')
export class CommandesController {
  constructor(private readonly commandesService: CommandesService) {}

  @Get()
  @ApiOperation({ summary: 'Liste toutes les commandes' })
  @ApiResponse({ status: 200, description: 'Liste des commandes' })
  findAll(): Promise<Commande[]> {
    return this.commandesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupère une commande par son ID' })
  @ApiParam({ name: 'id', description: 'ID de la commande' })
  @ApiResponse({ status: 200, description: 'Commande trouvée' })
  @ApiResponse({ status: 404, description: 'Commande non trouvée' })
  findOne(@Param('id') id: string): Promise<Commande> {
    return this.commandesService.findOne(Number(id));
  }

  @Post()
  @ApiOperation({ summary: 'Crée une nouvelle commande' })
  @ApiResponse({ status: 201, description: 'Commande créée avec succès' })
  @ApiBody({ 
    description: 'Données de la nouvelle commande',
    schema: {
      type: 'object',
      properties: {
        tableId: { type: 'number', example: 1 },
        clientId: { type: 'number', example: 1 },
        platId: { type: 'number', example: 1 },
        prixTotal: { type: 'number', example: 10.99 },
      }
   },
   })
  create(
    @Body()
    body: {
      tableId: number;
      clientId: number;
      platId: number;
      prixTotal?: number;
    },
  ): Promise<Commande> {
    return this.commandesService.create(
      body.tableId,
      body.clientId,
      body.platId,
      body.prixTotal,
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Modifie une commande' })
  @ApiParam({ name: 'id', description: 'ID de la commande à modifier' })
  @ApiResponse({ status: 200, description: 'Commande modifiée avec succès' })
  update(
    @Param('id') id: string,
    @Body()
    body: {
      tableId?: number;
      clientId?: number;
      platId?: number;
      prixTotal?: number;
    },
  ): Promise<Commande> {
    return this.commandesService.update(
      Number(id),
      body.tableId,
      body.clientId,
      body.platId,
      body.prixTotal,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprime une commande' })
  @ApiParam({ name: 'id', description: 'ID de la commande à supprimer' })
  @ApiResponse({ status: 200, description: 'Commande supprimée avec succès' })
  async remove(@Param('id') id: string) {
    await this.commandesService.remove(Number(id));
    return { message: `Commande #${id} supprimée` };
  }
}
