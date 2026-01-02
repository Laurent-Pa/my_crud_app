import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CommandesService } from './commandes.service';
import { Commande } from '../entities/commande.entity';
import { ClientsService } from '../clients/clients.service';
import { TablesService } from '../tables/tables.service';
import { PlatsService } from '../plats/plats.service';
import { NotFoundException } from '@nestjs/common';

describe('CommandesService', () => {
  let service: CommandesService;
  let repo: any;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
  };

  const mockClientsService = {
    findOne: jest.fn(),
  };

  const mockTablesService = {
    findOne: jest.fn(),
    update: jest.fn(),
  };

  const mockPlatsService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommandesService,
        {
          provide: getRepositoryToken(Commande),
          useValue: mockRepository,
        },
        { provide: ClientsService, useValue: mockClientsService },
        { provide: TablesService, useValue: mockTablesService },
        { provide: PlatsService, useValue: mockPlatsService },
      ],
    }).compile();

    service = module.get<CommandesService>(CommandesService);
    repo = module.get(getRepositoryToken(Commande));
  });

  afterEach(() => jest.clearAllMocks());

  // TEST findAll()
  it('should return all commandes', async () => {
    mockRepository.find.mockResolvedValue([{ id: 1 }]);

    const result = await service.findAll();

    expect(result).toEqual([{ id: 1 }]);
    expect(repo.find).toHaveBeenCalledWith({
      relations: ['client', 'table', 'plat'],
    });
  });

  // TEST findOne()
  it('should return one commande', async () => {
    mockRepository.findOne.mockResolvedValue({ id: 1 });

    const result = await service.findOne(1);

    expect(result).toEqual({ id: 1 });
  });

  it('should throw NotFoundException when commande not found', async () => {
    mockRepository.findOne.mockResolvedValue(null);

    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
  });

  // TEST create()
  it('should create a new commande and mark table as occupied', async () => {
    // Mock services
    mockClientsService.findOne.mockResolvedValue({ id: 10 });
    mockTablesService.findOne.mockResolvedValue({ id: 5 });
    mockPlatsService.findOne.mockResolvedValue({ id: 20, prix: 12 });

    const createdCommande = { id: 99, prixTotal: 12 };
    mockRepository.create.mockReturnValue(createdCommande);
    mockRepository.save.mockResolvedValue({ id: 99 });
    mockRepository.findOne.mockResolvedValue(createdCommande);

    const result = await service.create(5, 10, 20);

    expect(result).toEqual(createdCommande);
    expect(mockTablesService.update).toHaveBeenCalledWith(5, undefined, 'occupée');
  });

  // TEST update()
  it('should update a commande and recalculate price when plat changes', async () => {
    const existing = { id: 1, platId: 10, prixTotal: 20 };
    mockRepository.findOne.mockResolvedValue(existing);

    mockPlatsService.findOne.mockResolvedValue({ id: 30, prix: 15 });

    const saved = { ...existing, platId: 30, prixTotal: 15 };
    mockRepository.save.mockResolvedValue(saved);

    const result = await service.update(1, undefined, undefined, 30);

    expect(result).toEqual(saved);
  });

  // TEST remove()
  it('should remove a commande and free the table if last one', async () => {
    const commande = { id: 1, tableId: 8 };
    mockRepository.findOne.mockResolvedValue(commande);

    // Simule qu'il n'y avait qu'une commande sur la table
    mockRepository.find.mockResolvedValue([commande]);

    await service.remove(1);

    expect(repo.remove).toHaveBeenCalledWith(commande);
    expect(mockTablesService.update).toHaveBeenCalledWith(8, undefined, 'libre');
  });
});
