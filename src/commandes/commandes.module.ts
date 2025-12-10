// src/commandes/commandes.module.ts
import { Module, forwardRef } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandesService } from './commandes.service';
import { CommandesController } from './commandes.controller';
// import { Commande } from '../entities/commande.entity';
import { ClientsModule } from '../clients/clients.module';
import { TablesModule } from '../tables/tables.module';
import { PlatsModule } from '../plats/plats.module';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Commande]),
    forwardRef(() => ClientsModule),
    forwardRef(() => TablesModule),
    forwardRef(() => PlatsModule),
  ],
  controllers: [CommandesController],
  providers: [CommandesService],
})
export class CommandesModule {}
