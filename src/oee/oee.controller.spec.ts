import { Test, TestingModule } from '@nestjs/testing';
import { OeeController } from './oee.controller';
import { OeeService } from './oee.service';

describe('OeeController', () => {
  let controller: OeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OeeController],
      providers: [OeeService],
    }).compile();

    controller = module.get<OeeController>(OeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
