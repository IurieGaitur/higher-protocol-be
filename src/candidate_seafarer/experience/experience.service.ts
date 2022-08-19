import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { Experience } from './entities/experience.entity';

@Injectable()
export class ExperienceService {
  
  constructor(
    @InjectRepository(Experience)
    private readonly experienceRepo: Repository<Experience>
  ) {}

  create(createExperienceDto: CreateExperienceDto) {
    const created = this.experienceRepo.save(createExperienceDto)
    return created;
  }

  async findAllOfProfile(user_id: number)  {
    return await this.experienceRepo.findBy({'user_id': user_id})
  }

  async findOne(id: number) {
    const candidate = await this.experienceRepo.findOneBy({'id': id});
    return candidate;
  }

  async update(id: number, updateExperienceDto: UpdateExperienceDto) {
    const candidate = await this.experienceRepo.update(id, updateExperienceDto);
    return candidate;
  }

  async remove(id: number) {
    const candidate = await this.findOne(id);
   await this.experienceRepo.delete(id);
  }
}
