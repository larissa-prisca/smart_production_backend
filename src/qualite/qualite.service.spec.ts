import { Test, TestingModule } from '@nestjs/testing';
import { QualiteService } from './qualite.service';

describe('QualiteService', () => {
  let service: QualiteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QualiteService],
    }).compile();

    service = module.get<QualiteService>(QualiteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
