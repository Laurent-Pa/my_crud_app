// src/plats/plats.module.ts
import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatsService } from './plats.service';
import { PlatsController } from './plats.controller';
// import { Plat } from '../entities/plat.entity';

@Module({
  // imports: [TypeOrmModule.forFeature([Plat])],
  controllers: [PlatsController],
  providers: [PlatsService],
  exports: [PlatsService],
})
export class PlatsModule {}
//
