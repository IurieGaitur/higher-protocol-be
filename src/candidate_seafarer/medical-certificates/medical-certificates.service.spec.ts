import { Test, TestingModule } from '@nestjs/testing';
import { MedicalCertificatesService } from './medical-certificates.service';

describe('MedicalCertificatesService', () => {
  let service: MedicalCertificatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalCertificatesService],
    }).compile();

    service = module.get<MedicalCertificatesService>(MedicalCertificatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
