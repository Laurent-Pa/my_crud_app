import { PlatsService } from '../plats/plats.service';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

describe('PlatsService', () => {
  let service: PlatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlatsService],
    }).compile();

    service = module.get<PlatsService>(PlatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of plats',() => {
      const result = service.findAll();

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('nom');
      expect(result[0]).toHaveProperty('prix');
      expect(result[0]).toHaveProperty('description');
      expect(result[0]).toHaveProperty('allergenes');
      expect(result[0]).toHaveProperty('vegetarien');
    });

    it('should contain the default dishes ', () => {
      const result = service.findAll();

      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ nom: 'Burger Classique' }),
          expect.objectContaining({ nom: 'Salade César' }),
        ]),
      );
    });
  });

  describe('findOne', () => {
    it('should return a plat by id', async () => {
      const result = service.findOne(1);
      expect(result).toBeDefined();
      expect(result.id).toBe(1);
    });

    it('should throw NotFoundException if plat not found', async () => {
      expect(() => service.findOne(999)).toThrow(NotFoundException);
      expect(() => service.findOne(999)).toThrow('Plat #999 non trouvé');
    });
  });

  describe('create', () => {
    it('should create a new plat', () => {
      const platBefore = service.findAll().length;
      const result = service.create('New Plat', 10, "mock description", ["mock allergenes"], true);

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.nom).toBe('New Plat');
    });
  });

  describe('update', () => {
    it('should update a plat', () => {
      const result = service.update(1, 'Updated Plat') // rename the first plat
    expect(result.nom).toBe('Updated Plat')
    });

    
  });

});
