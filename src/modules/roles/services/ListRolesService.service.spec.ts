import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { RolesRepository } from '../infra/typeorm/repositories/RolesRepository';
import { FakeRolesRepository } from '../repositories/fakes/FakeRolesRepository';
import { ListRolesService } from './ListRolesService.service';

describe('ListRolesService', () => {
  let service: ListRolesService;
  let fakeRolesRepository: FakeRolesRepository;

  beforeEach(async () => {
    fakeRolesRepository = new FakeRolesRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListRolesService,
        {
          provide: getRepositoryToken(RolesRepository),
          useValue: fakeRolesRepository,
        },
      ],
    }).compile();

    service = module.get<ListRolesService>(ListRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should return an roles list', async () => {
      const roles = await service.execute();

      expect(roles).toEqual([]);
    });
  });
});
