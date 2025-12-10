// src/clients/clients.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ClientsService } from './clients.service';

// Interface locale
interface Client {
  id: number;
  nom: string;
  allergies: string[];
  majeur: boolean;
  vegetarien: boolean;
}

@ApiTags('clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les clients' })
  @ApiResponse({ status: 200, description: 'Liste des clients retournée avec succès' })
  findAll(): Client[] {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un client par son ID' })
  @ApiParam({ name: 'id', description: 'ID du client', example: 1 })
  @ApiResponse({ status: 200, description: 'Client trouvé' })
  @ApiResponse({ status: 404, description: 'Client non trouvé' })
  findOne(@Param('id') id: string): Client {
    return this.clientsService.findOne(Number(id));
  }

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau client' })
  @ApiBody({
    description: 'Données du nouveau client',
    schema: {
      type: 'object',
      properties: {
        nom: { type: 'string', example: 'Dupont Jean' },
        allergies: { type: 'array', items: { type: 'string' }, example: ['arachides', 'gluten'] },
        majeur: { type: 'boolean', example: true },
        vegetarien: { type: 'boolean', example: false },
      },
      required: ['nom', 'allergies', 'majeur', 'vegetarien'],
    },
  })
  @ApiResponse({ status: 201, description: 'Client créé avec succès' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  create(
    @Body()
    body: {
      nom: string;
      allergies: string[];
      majeur: boolean;
      vegetarien: boolean;
    },
  ): Client {
    return this.clientsService.create(
      body.nom,
      body.allergies,
      body.majeur,
      body.vegetarien,
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un client existant' })
  @ApiParam({ name: 'id', description: 'ID du client à modifier', example: 1 })
  @ApiBody({
    description: 'Données à mettre à jour',
    schema: {
      type: 'object',
      properties: {
        nom: { type: 'string', example: 'Dupont Jean' },
        allergies: { type: 'array', items: { type: 'string' }, example: ['arachides'] },
        majeur: { type: 'boolean', example: true },
        vegetarien: { type: 'boolean', example: true },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Client mis à jour avec succès' })
  @ApiResponse({ status: 404, description: 'Client non trouvé' })
  update(
    @Param('id') id: string,
    @Body()
    body: {
      nom?: string;
      allergies?: string[];
      majeur?: boolean;
      vegetarien?: boolean;
    },
  ): Client {
    return this.clientsService.update(
      Number(id),
      body.nom,
      body.allergies,
      body.majeur,
      body.vegetarien,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un client' })
  @ApiParam({ name: 'id', description: 'ID du client à supprimer', example: 1 })
  @ApiResponse({ status: 200, description: 'Client supprimé avec succès' })
  @ApiResponse({ status: 404, description: 'Client non trouvé' })
  remove(@Param('id') id: string) {
    this.clientsService.remove(Number(id));
    return { message: `Client #${id} supprimé` };
  }
}
