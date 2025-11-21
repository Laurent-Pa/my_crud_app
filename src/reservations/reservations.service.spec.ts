import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ReservationsService } from './reservations.service';
import { Reservation } from '../entities/reservation.entity';
import { ClientsService } from '../clients/clients.service';
import { TablesService } from '../tables/tables.service';
import { NotFoundException } from '@nestjs/common';

describe('ReservationsService', () => {
  let service: ReservationsService;
  let repo: any;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  const mockClientsService = {
    findOne: jest.fn(),
  };

  const mockTablesService = {
    findOne: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsService,
        {
          provide: getRepositoryToken(Reservation),
          useValue: mockRepository,
        },
        { provide: ClientsService, useValue: mockClientsService },
        { provide: TablesService, useValue: mockTablesService },
      ],
    }).compile();

    service = module.get<ReservationsService>(ReservationsService);
    repo = module.get(getRepositoryToken(Reservation));
  });

  afterEach(() => jest.clearAllMocks());

  // TEST findAll()
  it('should return all reservations', async () => {
    mockRepository.find.mockResolvedValue([{ id: 1 }]);

    const result = await service.findAll();

    expect(result).toEqual([{ id: 1 }]);
    expect(repo.find).toHaveBeenCalledWith({
      relations: ['client', 'table'],
    });
  });

  // TEST findOne()
  it('should return one reservation', async () => {
    mockRepository.findOne.mockResolvedValue({ id: 1 });

    const res = await service.findOne(1);

    expect(res).toEqual({ id: 1 });
  });

  it('should throw NotFoundException if reservation not found', async () => {
    mockRepository.findOne.mockResolvedValue(null);

    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
  });

  // TEST create()
  it('should create a reservation when table is free', async () => {
    mockClientsService.findOne.mockResolvedValue({ id: 10 });

    mockTablesService.findOne.mockResolvedValue({
      id: 5,
      statut: 'libre',
    });

    const created = { id: 99 };
    mockRepository.create.mockReturnValue(created);
    mockRepository.save.mockResolvedValue(created);
    mockRepository.findOne.mockResolvedValue(created);

    const result = await service.create(10, 5);

    expect(result).toEqual(created);
    expect(mockRepository.create).toHaveBeenCalledWith({
      clientId: 10,
      tableId: 5,
    });
    expect(mockTablesService.update).toHaveBeenCalledWith(
      5,
      undefined,
      'réservée',
    );
  });

  it('should throw error if table is occupied', async () => {
    mockClientsService.findOne.mockResolvedValue({ id: 10 });

    mockTablesService.findOne.mockResolvedValue({
      id: 5,
      statut: 'occupée',
    });

    await expect(service.create(10, 5)).rejects.toThrow(
      `La table #5 est actuellement occupée`,
    );
  });

  // TEST update()
  it('should update a reservation and change the table', async () => {
    const reservation = { id: 1, clientId: 10, tableId: 5 };
    const saved = { ...reservation, tableId: 8 };

    // ORDERED responses for repo.findOne()
    mockRepository.findOne
      .mockResolvedValueOnce(reservation) // first findOne(id) inside update()
      .mockResolvedValueOnce(saved) // final findOne(id) in return
      .mockResolvedValue(saved); // fallback if extra call

    // Correct order of table lookups
    mockTablesService.findOne
      .mockResolvedValueOnce({ id: 5, statut: 'réservée' }) // old table
      .mockResolvedValueOnce({ id: 8, statut: 'libre' }); // new table

    mockRepository.save.mockResolvedValue(saved);

    const result = await service.update(1, undefined, 8);

    expect(mockTablesService.update.mock.calls).toEqual([
      [5, undefined, 'libre'],
      [8, undefined, 'réservée'],
    ]);
    expect(result).toEqual(saved);
  });

  it('should throw error if new table is occupied', async () => {
    const reservation = { id: 1, clientId: 10, tableId: 5 };

    mockRepository.findOne.mockResolvedValue(reservation);

    mockTablesService.findOne
      .mockResolvedValueOnce({ id: 5, statut: 'réservée' }) // ancienne table
      .mockResolvedValueOnce({ id: 8, statut: 'occupée' }); // nouvelle table occupée

    await expect(service.update(1, undefined, 8)).rejects.toThrow(
      `La table #8 est actuellement occupée`,
    );
  });

  // TEST remove()
  it('should remove a reservation and free the table', async () => {
    const reservation = { id: 1, tableId: 3 };

    mockRepository.findOne.mockResolvedValue(reservation);

    await service.remove(1);

    expect(mockTablesService.update).toHaveBeenCalledWith(
      3,
      undefined,
      'libre',
    );
    expect(repo.remove).toHaveBeenCalledWith(reservation);
  });
});
