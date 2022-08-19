import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDeclarationDto } from './dto/create-declaration.dto';
import { UpdateDeclarationDto } from './dto/update-declaration.dto';
import { Declaration } from './entities/declaration.entity';

@Injectable()
export class DeclarationService {

  constructor(
    @InjectRepository(Declaration)
    private readonly declarationRepo: Repository<Declaration>
  ) {}

  create(createDeclarationDto: CreateDeclarationDto) {
    const created = this.declarationRepo.save(createDeclarationDto)
    return created;
  }

  async findAllOfProfile(user_id: number)  {
    return await this.declarationRepo.findBy({'user_id': user_id})
  }

  async findOne(id: number) {
    const candidate = await this.declarationRepo.findOneBy({'id': id});
    return candidate;
  }

  async update(id: number, updateDeclarationDto: UpdateDeclarationDto) {
    const candidate = await this.declarationRepo.update(id, updateDeclarationDto);
    return candidate;
  }

  async remove(id: number) {
    const candidate = await this.findOne(id);
   await this.declarationRepo.delete(id);
  }
}
