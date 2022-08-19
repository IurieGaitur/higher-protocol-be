import { Module } from '@nestjs/common';
import { MedicalCertificatesService } from './medical-certificates.service';
import { MedicalCertificatesController } from './medical-certificates.controller';
import { MedicalCertificate } from './entities/medical-certificate.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalCertificate])],
  controllers: [MedicalCertificatesController],
  providers: [MedicalCertificatesService]
})
export class MedicalCertificatesModule {}
