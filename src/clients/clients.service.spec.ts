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

  it('devrait être défini', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('devrait retourner un tableau de clients', () => {
      const result = service.findAll();

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('nom');
      expect(result[0]).toHaveProperty('allergies');
      expect(result[0]).toHaveProperty('majeur');
      expect(result[0]).toHaveProperty('vegetarien');
    });

    it('devrait contenir les clients par défaut', () => {
      const result = service.findAll();

      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ nom: 'Dupont Jean' }),
          expect.objectContaining({ nom: 'Martin Sophie' }),
        ]),
      );
    });
  });

  describe('findOne', () => {
    it('devrait retourner un client par son ID', () => {
      const result = service.findOne(1);

      expect(result).toBeDefined();
      expect(result.id).toBe(1);
      expect(result.nom).toBe('Dupont Jean');
    });

    it("devrait lancer une exception si le client n'existe pas", () => {
      expect(() => service.findOne(999)).toThrow(NotFoundException);
      expect(() => service.findOne(999)).toThrow('Client #999 non trouvé');
    });
  });

  describe('create', () => {
    it('devrait créer un nouveau client', () => {
      const clientsAvant = service.findAll().length;

      const result = service.create('Nouveau Client', ['gluten'], true, false);

      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.nom).toBe('Nouveau Client');
      expect(result.allergies).toEqual(['gluten']);
      expect(result.majeur).toBe(true);
      expect(result.vegetarien).toBe(false);

      const clientsApres = service.findAll().length;
      expect(clientsApres).toBe(clientsAvant + 1);
    });

    it('devrait gérer les valeurs par défaut', () => {
      const result = service.create('Client Simple', [], false, false);

      expect(result.allergies).toEqual([]);
      expect(result.majeur).toBe(false);
      expect(result.vegetarien).toBe(false);
    });

    it('devrait auto-incrémenter les IDs', () => {
      const client1 = service.create('Client 1', [], true, false);
      const client2 = service.create('Client 2', [], true, false);

      expect(client2.id).toBeGreaterThan(client1.id);
    });
  });

  describe('update', () => {
    it('devrait mettre à jour un client existant', () => {
      const result = service.update(1, 'Dupont Jean-Pierre', [
        'arachides',
        'lactose',
      ]);

      expect(result.nom).toBe('Dupont Jean-Pierre');
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
      const clientsAvant = service.findAll().length;

      service.remove(1);

      const clientsApres = service.findAll().length;
      expect(clientsApres).toBe(clientsAvant - 1);

      expect(() => service.findOne(1)).toThrow(NotFoundException);
    });

    it("devrait lancer une exception si le client n'existe pas", () => {
      expect(() => service.remove(999)).toThrow(NotFoundException);
      expect(() => service.remove(999)).toThrow('Client #999 non trouvé');
    });
  });
});
