import { Test, TestingModule } from '@nestjs/testing';
import { RecordSeaServeService } from './record-sea-serve.service';

describe('RecordSeaServeService', () => {
  let service: RecordSeaServeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecordSeaServeService],
    }).compile();

    service = module.get<RecordSeaServeService>(RecordSeaServeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
