// src/plats/plats.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { PlatsService } from './plats.service';

// Local Interface (same as in the service)
interface Plat {
  id: number;
  nom: string;
  prix: number;
  description: string;
  allergenes: string[];
  vegetarien: boolean;
}

@Controller('plats')
export class PlatsController {
  constructor(private readonly platsService: PlatsService) {}

  @Get()
  findAll(): Plat[] {
    return this.platsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Plat {
    return this.platsService.findOne(Number(id));
  }

  @Post()
  create(
    @Body()
    body: {
      nom: string;
      prix: number;
      description: string;
      allergenes: string[];
      vegetarien: boolean;
    },
  ): Plat {
    return this.platsService.create(
      body.nom,
      body.prix,
      body.description,
      body.allergenes,
      body.vegetarien,
    );
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body()
    body: {
      nom?: string;
      prix?: number;
      description?: string;
      allergenes?: string[];
      vegetarien?: boolean;
    },
  ): Plat {
    return this.platsService.update(
      Number(id),
      body.nom,
      body.prix,
      body.description,
      body.allergenes,
      body.vegetarien,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.platsService.remove(Number(id));
    return { message: `Plat #${id} supprimé` };
  }
}
