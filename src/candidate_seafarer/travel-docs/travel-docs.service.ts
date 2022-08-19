import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTravelDocDto } from './dto/create-travel-doc.dto';
import { UpdateTravelDocDto } from './dto/update-travel-doc.dto';
import { TravelDoc } from './entities/travel-doc.entity';

@Injectable()
export class TravelDocsService {

  constructor(
    @InjectRepository(TravelDoc)
    private readonly travelDocsRepo: Repository<TravelDoc>
  ) {}

  create(createTravelDocDto: CreateTravelDocDto) {
    const created = this.travelDocsRepo.save(createTravelDocDto)
    return created;
  }

  async findAllOfProfile(user_id: number)  {
    return await this.travelDocsRepo.findBy({'user_id': user_id})
  }

  async findOne(id: number) {
    const candidate = await this.travelDocsRepo.findOneBy({'id': id});
    return candidate;
  }

  async update(id: number, updateTravelDocDto: UpdateTravelDocDto) {
    const candidate = await this.travelDocsRepo.update(id, updateTravelDocDto);
    return candidate;
  }

  async remove(id: number) {
    const candidate = await this.findOne(id);
   await this.travelDocsRepo.delete(id);
  }
}
