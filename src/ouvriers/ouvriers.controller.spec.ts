import { Test, TestingModule } from '@nestjs/testing';
import { OuvriersController } from './ouvriers.controller';
import { OuvriersService } from './ouvriers.service';

describe('OuvriersController', () => {
  let controller: OuvriersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OuvriersController],
      providers: [OuvriersService],
    }).compile();

    controller = module.get<OuvriersController>(OuvriersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
