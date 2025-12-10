// src/reservations/reservations.module.ts
import { Module, forwardRef } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
// import { Reservation } from '../entities/reservation.entity';
import { ClientsModule } from '../clients/clients.module';
import { TablesModule } from '../tables/tables.module';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Reservation]),
    forwardRef(() => ClientsModule),
    forwardRef(() => TablesModule),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
