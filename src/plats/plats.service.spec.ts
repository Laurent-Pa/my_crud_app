import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { PlatsService } from './plats.service';
import { Plat } from '../entities/plat.entity';

describe('PlatsService', () => {
  let service: PlatsService;

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
});
