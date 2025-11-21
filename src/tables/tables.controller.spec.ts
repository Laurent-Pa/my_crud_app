import { Test, TestingModule } from '@nestjs/testing';
import { TablesController } from './tables.controller';
import { TablesService } from './tables.service';
import { Table } from '../entities/table.entity';

describe('TablesController', () => {
  let controller: TablesController;

  const sampleTable: Table = {
    id: 1,
    capacite: 4,
    statut: 'LIBRE' as any,
  };

  const mockTablesService = {
    findAll: jest.fn().mockResolvedValue([sampleTable]),
    findOne: jest.fn().mockImplementation((id: number) =>
      Promise.resolve({ ...sampleTable, id: Number(id) }),
    ),
    create: jest.fn().mockImplementation((capacite: number, statut?: any) =>
      Promise.resolve({ ...sampleTable, id: 2, capacite, statut }),
    ),
    update: jest.fn().mockImplementation((id: number, capacite?: number, statut?: any) =>
      Promise.resolve({
        ...sampleTable,
        id: Number(id),
        ...(capacite !== undefined ? { capacite } : {}),
        ...(statut !== undefined ? { statut } : {}),
      }),
    ),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TablesController],
      providers: [
        {
          provide: TablesService,
          useValue: mockTablesService,
        },
      ],
    }).compile();

    controller = module.get<TablesController>(TablesController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('devrait retourner toutes les tables', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([sampleTable]);
    expect(mockTablesService.findAll).toHaveBeenCalled();
  });

  it('devrait retourner une table par id', async () => {
    const result = await controller.findOne('1');
    expect(result).toEqual({ ...sampleTable, id: 1 });
    expect(mockTablesService.findOne).toHaveBeenCalledWith(1);
  });

  it('devrait créer une table', async () => {
    const payload = { capacite: 6, statut: 'RESERVE' as any };
    const result = await controller.create(payload);
    expect(result).toEqual({
      ...sampleTable,
      id: 2,
      capacite: payload.capacite,
      statut: payload.statut,
    });
    expect(mockTablesService.create).toHaveBeenCalledWith(payload.capacite, payload.statut);
  });

  it('devrait mettre à jour une table', async () => {
    const payload = { capacite: 8, statut: 'OCCUPE' as any };
    const result = await controller.update('3', payload);
    expect(result).toEqual({
      ...sampleTable,
      id: 3,
      capacite: payload.capacite,
      statut: payload.statut,
    });
    expect(mockTablesService.update).toHaveBeenCalledWith(3, payload.capacite, payload.statut);
  });

  it('devrait supprimer une table et retourner un message', async () => {
    const result = await controller.remove('5');
    expect(result).toEqual({ message: 'Table #5 supprimée' });
    expect(mockTablesService.remove).toHaveBeenCalledWith(5);
  });
});
