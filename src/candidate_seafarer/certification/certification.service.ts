import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { CreateCertificationDto } from './dto/create-certification.dto';
import { UpdateCertificationDto } from './dto/update-certification.dto';
import { Certification } from './entities/certification.entity';

@Injectable()
export class CertificationService {

  constructor(
    @InjectRepository(Certification)
    private readonly certificationRepo: Repository<Certification>
  ) {}
  
  create(createCertificationDto: CreateCertificationDto) {
    const created = this.certificationRepo.save(createCertificationDto)
    return created;
  }

  async findAllOfProfile(user_id: number)  {
    return await this.certificationRepo.findBy({'user_id': user_id})
  }

  async findOne(id: number) {
    const candidate = await this.certificationRepo.findOneBy({'id': id});
    return candidate;
  }

  async update(id: number, updateCertificationDto: UpdateCertificationDto) {
    const candidate = await this.certificationRepo.update(id, updateCertificationDto);
    return candidate;
  }

  async remove(id: number) {
    const candidate = await this.findOne(id);
   await this.certificationRepo.delete(id);
  }
}
