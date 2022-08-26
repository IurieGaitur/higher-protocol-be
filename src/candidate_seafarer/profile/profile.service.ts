import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {

  constructor(
    @InjectRepository(Profile)
    private readonly profilesRepo: Repository<Profile>
  ) {}

  create(createProfileDto: CreateProfileDto) {
    const created = this.profilesRepo.save(createProfileDto)
    return created;
  }

  async findAll()  {
    let result = await this.profilesRepo.find();
    return result
  }

  async findOne(id: number) {
    const candidate = await this.profilesRepo.findOneBy({'id': id});
    return candidate;
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    const candidate = await this.profilesRepo.update(id, updateProfileDto);
    return candidate;
  }

  async remove(id: number) {
    const candidate = await this.findOne(id);
   await this.profilesRepo.delete(id);
  }
}
