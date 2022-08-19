import { Test, TestingModule } from '@nestjs/testing';
import { TravelDocsService } from './travel-docs.service';

describe('TravelDocsService', () => {
  let service: TravelDocsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TravelDocsService],
    }).compile();

    service = module.get<TravelDocsService>(TravelDocsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
