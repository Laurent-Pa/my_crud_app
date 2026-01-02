import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlatsService } from './plats.service';
import { Plat } from '../entities/plat.entity';
import { NotFoundException } from '@nestjs/common';

describe('PlatsService', () => {
  let service: PlatsService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlatsService,
        {
          provide: getRepositoryToken(Plat),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PlatsService>(PlatsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of plats', async () => {
      const plats: Plat[] = [
        { id: 1, nom: 'Pizza', prix: 12.5, description: 'Délicieuse', allergenes: ['lactose'], vegetarien: false, commandes: [] },
      ];

      mockRepository.find.mockResolvedValue(plats);

      const result = await service.findAll();

      expect(result).toEqual(plats);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a plat by id', async () => {
      const plat: Plat = { id: 1, nom: 'Pizza', prix: 12.5, description: 'Bonne', allergenes: ['lactose'], vegetarien: false, commandes: [] };

      mockRepository.findOne.mockResolvedValue(plat);

      const result = await service.findOne(1);

      expect(result).toEqual(plat);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if plat not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a plat', async () => {
      const newPlat = { nom: 'Salade', prix: 8, description: 'Fraîche', allergenes: ['gluten'], vegetarien: true };
      const created = { ...newPlat };
      const saved: Plat = { id: 1, ...newPlat, commandes: [] };

      mockRepository.create.mockReturnValue(created);
      mockRepository.save.mockResolvedValue(saved);

      const result = await service.create(newPlat.nom, newPlat.prix, newPlat.description, newPlat.allergenes, newPlat.vegetarien);

      expect(result).toEqual(saved);
      expect(mockRepository.create).toHaveBeenCalledWith(newPlat);
      expect(mockRepository.save).toHaveBeenCalledWith(created);
    });
  });

  describe('update', () => {
    it('should update a plat', async () => {
      const existing: Plat = { id: 1, nom: 'Pizza', prix: 10, description: 'OK', allergenes: [], vegetarien: false, commandes: [] };
      const updatedData = { nom: 'Pizza XL', prix: 15, allergenes: ['lactose'] };
      const updatedPlat: Plat = { ...existing, ...updatedData };

      mockRepository.findOne.mockResolvedValue(existing);
      mockRepository.save.mockResolvedValue(updatedPlat);

      const result = await service.update(1, updatedData.nom, updatedData.prix, undefined, updatedData.allergenes, undefined);

      expect(result).toEqual(updatedPlat);
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove a plat', async () => {
      const plat: Plat = { id: 1, nom: 'Pizza', prix: 12.5, description: 'Délicieuse', allergenes: ['lactose'], vegetarien: false, commandes: [] };

      mockRepository.findOne.mockResolvedValue(plat);
      mockRepository.remove.mockResolvedValue(plat);

      await service.remove(1);

      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockRepository.remove).toHaveBeenCalledWith(plat);
    });
  });
});
