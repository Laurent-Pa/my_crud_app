import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ClientsService } from './clients.service';

describe('ClientsService', () => {
  let service: ClientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientsService],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of clients', () => {
      const result = service.findAll();

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('nom');
      expect(result[0]).toHaveProperty('allergies');
      expect(result[0]).toHaveProperty('majeur');
      expect(result[0]).toHaveProperty('vegetarien');
    });

    it('should contain default clients', () => {
      const result = service.findAll();

      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ nom: 'KOUADIO Romaric' }),
          expect.objectContaining({ nom: 'PAPINAUD Laurent' }),
        ]),
      );
    });
  });

  describe('findOne', () => {
    it('should return a client by his ID', () => {
      const result = service.findOne(1);

      expect(result).toBeDefined();
      expect(result.id).toBe(1);
    });

    it("should throw NotFoundException if client not found", () => {
      expect(() => service.findOne(999)).toThrow(NotFoundException);
      expect(() => service.findOne(999)).toThrow('Client #999 non trouvé');
    });
  });

  describe('create', () => {
    it('should create a new client', () => {
      const clientsBefore = service.findAll().length;

      const result = service.create('New Client', ['gluten'], true, false);

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.nom).toBe('New Client');
      expect(result.allergies).toEqual(['gluten']);
      expect(result.majeur).toBe(true);
      expect(result.vegetarien).toBe(false);

      const clientsAfter = service.findAll().length;
      expect(clientsAfter).toBe(clientsBefore + 1);
    });

    it('should create default values', () => {
      const result = service.create('Client Simple', [], false, false);

      expect(result.allergies).toEqual([]);
      expect(result.majeur).toBe(false);
      expect(result.vegetarien).toBe(false);
    });

    it('should auto-increment IDs', () => {
      const client1 = service.create('Client 1', [], true, false);
      const client2 = service.create('Client 2', [], true, false);

      expect(client2.id).toBeGreaterThan(client1.id);
    });
  });

  describe('update', () => {
    it('should update an existing client', () => {
      const result = service.update(1, 'BRETON Bryan', [    // rename the first client
        'arachides',
        'lactose',
      ]);

      expect(result.nom).toBe('BRETON Bryan');
      expect(result.allergies).toEqual(['arachides', 'lactose']);
    });

    it('devrait mettre à jour seulement les champs fournis', () => {
      const clientAvant = service.findOne(1);
      const result = service.update(1, 'Nouveau Nom');

      expect(result.nom).toBe('Nouveau Nom');
      expect(result.allergies).toEqual(clientAvant.allergies);
      expect(result.majeur).toBe(clientAvant.majeur);
      expect(result.vegetarien).toBe(clientAvant.vegetarien);
    });

    it("devrait lancer une exception si le client n'existe pas", () => {
      expect(() => service.update(999, 'Test')).toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('devrait supprimer un client', () => {
      const clientsBefore = service.findAll().length;

      service.remove(1);

      const clientsAfter = service.findAll().length;
      expect(clientsAfter).toBe(clientsBefore - 1);

      expect(() => service.findOne(1)).toThrow(NotFoundException);
    });

    it("devrait lancer une exception si le client n'existe pas", () => {
      expect(() => service.remove(999)).toThrow(NotFoundException);
      expect(() => service.remove(999)).toThrow('Client #999 non trouvé');
    });
  });
});
