import { Test, TestingModule } from '@nestjs/testing';
import { TravelDocsController } from './travel-docs.controller';
import { TravelDocsService } from './travel-docs.service';

describe('TravelDocsController', () => {
  let controller: TravelDocsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TravelDocsController],
      providers: [TravelDocsService],
    }).compile();

    controller = module.get<TravelDocsController>(TravelDocsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
