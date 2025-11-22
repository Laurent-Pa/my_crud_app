// src/tables/tables.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Table, StatutTable } from '../entities/table.entity';

@Injectable()
export class TablesService {
  constructor(
    @InjectRepository(Table)
    private readonly tableRepository: Repository<Table>,
  ) {}

  findAll(): Promise<Table[]> {
    return this.tableRepository.find();
  }

  async findOne(id: number): Promise<Table> {
    const table = await this.tableRepository.findOne({ where: { id } });
    if (!table) throw new NotFoundException(`Table #${id} non trouvée`);
    return table;
  }

  async create(
    capacite: number,
    statut: StatutTable = StatutTable.LIBRE,
  ): Promise<Table> {
    const nouvelleTable = this.tableRepository.create({
      capacite,
      statut,
    });
    return this.tableRepository.save(nouvelleTable);
  }

  async update(
    id: number,
    capacite?: number,
    statut?: StatutTable,
  ): Promise<Table> {
    const table = await this.findOne(id);
    if (capacite !== undefined) table.capacite = capacite;
    if (statut !== undefined) table.statut = statut;
    return this.tableRepository.save(table);
  }

  async remove(id: number): Promise<void> {
    const table = await this.findOne(id);
    await this.tableRepository.remove(table);
  }
}
