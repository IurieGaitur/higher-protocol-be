import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMedicalCertificateDto } from './dto/create-medical-certificate.dto';
import { UpdateMedicalCertificateDto } from './dto/update-medical-certificate.dto';
import { MedicalCertificate } from './entities/medical-certificate.entity';

@Injectable()
export class MedicalCertificatesService {

  constructor(
    @InjectRepository(MedicalCertificate)
    private readonly medicalCertsRepo: Repository<MedicalCertificate>
  ) {}

  create(createMedicalCertificateDto: CreateMedicalCertificateDto) {
    const created = this.medicalCertsRepo.save(createMedicalCertificateDto)
    return created;
  }

  async findAllOfProfile(user_id: number)  {
    return await this.medicalCertsRepo.findBy({'user_id': user_id})
  }

  async findOne(id: number) {
    const candidate = await this.medicalCertsRepo.findOneBy({'id': id});
    return candidate;
  }

  async update(id: number, updateMedicalCertificateDto: UpdateMedicalCertificateDto) {
    const candidate = await this.medicalCertsRepo.update(id, updateMedicalCertificateDto);
    return candidate;
  }

  async remove(id: number) {
    const candidate = await this.findOne(id);
   await this.medicalCertsRepo.delete(id);
  }
}
