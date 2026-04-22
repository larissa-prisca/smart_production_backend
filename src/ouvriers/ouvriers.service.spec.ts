import { Test, TestingModule } from '@nestjs/testing';
import { OuvriersService } from './ouvriers.service';

describe('OuvriersService', () => {
  let service: OuvriersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OuvriersService],
    }).compile();

    service = module.get<OuvriersService>(OuvriersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
