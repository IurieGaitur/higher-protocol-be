import { Injectable } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { Candidate } from './entities/candidate.entity';

@Injectable()
export class CandidateService {
  async create(createCandidateDto: CreateCandidateDto) {
     console.log(createCandidateDto);
     const candidate = CreateCandidateDto.toCandidate(createCandidateDto);
     let created = await candidate.save();
     return created;
  }

  async findAll() {
    const candidates = await Candidate.find();
    return candidates;
  }

  async findOne(id: number) {
    const candidate = await Candidate.findOneBy({'id': id});
    return candidate;
  }

  update(id: number, updateCandidateDto: UpdateCandidateDto) {
    return `This action updates a #${id} candidate`;
  }

  async remove(id: number) {
    const candidate = await this.findOne(id);
    await Candidate.delete(id);
  }
}
