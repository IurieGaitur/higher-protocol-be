import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { Education } from './entities/education.entity';

@Injectable()
export class EducationService {
  
  constructor(
    @InjectRepository(Education)
    private readonly educationRepo: Repository<Education>
  ) {}

  create(createEducationDto: CreateEducationDto) {
    const created = this.educationRepo.save(createEducationDto)
    return created;
  }

  async findAllOfProfile(user_id: number)  {
    return await this.educationRepo.findBy({'user_id': user_id})
  }

  async findOne(id: number) {
    const candidate = await this.educationRepo.findOneBy({'id': id});
    return candidate;
  }

  async update(id: number, updateEducationDto: UpdateEducationDto) {
    const candidate = await this.educationRepo.update(id, updateEducationDto);
    return candidate;
  }

  async remove(id: number) {
    const candidate = await this.findOne(id);
   await this.educationRepo.delete(id);
  }
}
