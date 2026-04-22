import { Test, TestingModule } from '@nestjs/testing';
import { OeeService } from './oee.service';

describe('OeeService', () => {
  let service: OeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OeeService],
    }).compile();

    service = module.get<OeeService>(OeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
