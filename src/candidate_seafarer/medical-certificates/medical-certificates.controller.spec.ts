import { Test, TestingModule } from '@nestjs/testing';
import { MedicalCertificatesController } from './medical-certificates.controller';
import { MedicalCertificatesService } from './medical-certificates.service';

describe('MedicalCertificatesController', () => {
  let controller: MedicalCertificatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalCertificatesController],
      providers: [MedicalCertificatesService],
    }).compile();

    controller = module.get<MedicalCertificatesController>(MedicalCertificatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
