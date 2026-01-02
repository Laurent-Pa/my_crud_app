import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { ClientsService } from './clients.service';
import { Client } from '../entities/client.entity';

describe('ClientsService', () => {
  let service: ClientsService;
  // let repository: Repository<Client>;

  // Mock du repository
  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        {
          provide: getRepositoryToken(Client),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
    // repository = module.get<Repository<Client>>(getRepositoryToken(Client));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('devrait être défini', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('devrait retourner un tableau de clients', async () => {
      const clients: Client[] = [
        {
          id: 1,
          nom: 'Dupont Jean',
          allergies: ['arachides'],
          majeur: true,
          vegetarien: false,
          reservations: [],
          commandes: [],
        },
        {
          id: 2,
          nom: 'Martin Sophie',
          allergies: [],
          majeur: true,
          vegetarien: true,
          reservations: [],
          commandes: [],
        },
      ];

      mockRepository.find.mockResolvedValue(clients);

      const result = await service.findAll();

      expect(result).toEqual(clients);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });

    it('devrait retourner un tableau vide si aucun client', async () => {
      mockRepository.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('devrait retourner un client par son ID', async () => {
      const client: Client = {
        id: 1,
        nom: 'Dupont Jean',
        allergies: ['arachides'],
        majeur: true,
        vegetarien: false,
        reservations: [],
        commandes: [],
      };

      mockRepository.findOne.mockResolvedValue(client);

      const result = await service.findOne(1);

      expect(result).toEqual(client);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it("devrait retourner null si le client n'existe pas", async () => {
      mockRepository.findOne.mockResolvedValue(null);

      // Le service lance une exception, pas return null
      await expect(service.findOne(999)).rejects.toThrow("Client #999 non trouvé");
    });
  });

  describe('create', () => {
    it('devrait créer un nouveau client', async () => {
      const newClient = {
        nom: 'Nouveau Client',
        allergies: ['gluten'],
        majeur: true,
        vegetarien: false,
      };

      const createdClient = {
        ...newClient,
      };

      const savedClient: Client = {
        id: 1,
        ...newClient,
        reservations: [],
        commandes: [],
      };

      mockRepository.create.mockReturnValue(createdClient);  // ← Mock create
      mockRepository.save.mockResolvedValue(savedClient);

      const result = await service.create(
        newClient.nom,
        newClient.allergies,
        newClient.majeur,
        newClient.vegetarien,
      );

      expect(result).toEqual(savedClient);
      expect(mockRepository.create).toHaveBeenCalledWith({
        nom: newClient.nom,
        allergies: newClient.allergies,
        majeur: newClient.majeur,
        vegetarien: newClient.vegetarien,
      });
      expect(mockRepository.save).toHaveBeenCalledWith(createdClient);
    });
  });

  describe('update', () => {
    it('devrait mettre à jour un client existant', async () => {
      const existingClient: Client = {
        id: 1,
        nom: 'Dupont Jean',
        allergies: ['arachides'],
        majeur: true,
        vegetarien: false,
        reservations: [],
        commandes: [],
      };

      const updatedData = {
        nom: 'Dupont Jean-Pierre',
        allergies: ['arachides', 'lactose'],
      };

      const updatedClient: Client = {
        ...existingClient,
        ...updatedData,
      };

      mockRepository.findOne.mockResolvedValue(existingClient);
      mockRepository.save.mockResolvedValue(updatedClient);

      const result = await service.update(
        1,
        updatedData.nom,
        updatedData.allergies,
      );

      expect(result).toEqual(updatedClient);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });

  it('devrait supprimer un client', async () => {
    const clientToRemove: Client = {
      id: 1,
      nom: 'Dupont Jean',
      allergies: [],
      majeur: true,
      vegetarien: false,
      reservations: [],
      commandes: [],
    };

    mockRepository.findOne.mockResolvedValue(clientToRemove);
    mockRepository.remove.mockResolvedValue(clientToRemove);  // ← Mock remove

    await service.remove(1);

    expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(mockRepository.remove).toHaveBeenCalledWith(clientToRemove);
  });
});
