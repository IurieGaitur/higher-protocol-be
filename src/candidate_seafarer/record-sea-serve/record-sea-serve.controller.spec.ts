import { Test, TestingModule } from '@nestjs/testing';
import { RecordSeaServeController } from './record-sea-serve.controller';
import { RecordSeaServeService } from './record-sea-serve.service';

describe('RecordSeaServeController', () => {
  let controller: RecordSeaServeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecordSeaServeController],
      providers: [RecordSeaServeService],
    }).compile();

    controller = module.get<RecordSeaServeController>(RecordSeaServeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
