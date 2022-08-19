import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecordSeaServeDto } from './dto/create-record-sea-serve.dto';
import { UpdateRecordSeaServeDto } from './dto/update-record-sea-serve.dto';
import { RecordSeaServe } from './entities/record-sea-serve.entity';

@Injectable()
export class RecordSeaServeService {

  constructor(
    @InjectRepository(RecordSeaServe)
    private readonly recordSeaServeRepo: Repository<RecordSeaServe>
  ) {}

  create(createRecordSeaServeDto: CreateRecordSeaServeDto) {
    const created = this.recordSeaServeRepo.save(createRecordSeaServeDto)
    return created;
  }

  async findAllOfProfile(user_id: number)  {
    return await this.recordSeaServeRepo.findBy({'user_id': user_id})
  }

  async findOne(id: number) {
    const candidate = await this.recordSeaServeRepo.findOneBy({'id': id});
    return candidate;
  }

  async update(id: number, updateRecordSeaServeDto: UpdateRecordSeaServeDto) {
    const candidate = await this.recordSeaServeRepo.update(id, updateRecordSeaServeDto);
    return candidate;
  }

  async remove(id: number) {
    const candidate = await this.findOne(id);
   await this.recordSeaServeRepo.delete(id);
  }
}
