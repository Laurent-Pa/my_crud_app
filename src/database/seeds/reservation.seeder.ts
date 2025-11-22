import { DataSource } from 'typeorm';
import { Reservation } from '../../entities/reservation.entity';

export async function seedReservations(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(Reservation);

    const seeds = [
        { clientId: 1, tableId: 1 },
        { clientId: 2, tableId: 2 },
        { clientId: 3, tableId: 3 },
    ];

    await repo.save(seeds);

    console.log(`✅ ${seeds.length} réservations créées`);
}

