import { DataSource } from 'typeorm';
import { Table, StatutTable } from '../../entities/table.entity';

export async function seedTables(dataSource: DataSource): Promise<void> {
    const repo = dataSource.getRepository(Table);

    const tables = [
        { capacite: 2, statut: StatutTable.LIBRE },
        { capacite: 4, statut: StatutTable.OCCUPEE },
        { capacite: 6, statut: StatutTable.RESERVEE },
    ];

    await repo.save(tables);

    console.log(`✅ ${tables.length} tables créées`);
}
