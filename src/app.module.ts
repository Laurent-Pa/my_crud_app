// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlatsModule } from './plats/plats.module';
import { ClientsModule } from './clients/clients.module';
import { TablesModule } from './tables/tables.module';
import { ReservationsModule } from './reservations/reservations.module';
import { CommandesModule } from './commandes/commandes.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PlatsModule,
    ClientsModule,
    TablesModule,
    ReservationsModule,
    CommandesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
