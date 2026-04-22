import { Test, TestingModule } from '@nestjs/testing';
import { QualiteController } from './qualite.controller';
import { QualiteService } from './qualite.service';

describe('QualiteController', () => {
  let controller: QualiteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QualiteController],
      providers: [QualiteService],
    }).compile();

    controller = module.get<QualiteController>(QualiteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
