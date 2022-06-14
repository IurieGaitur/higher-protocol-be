import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { Candidate } from './entities/candidate.entity';

@Injectable()
export class CandidateService {

  constructor(
    @InjectRepository(Candidate)
    private readonly candidateRepo: Repository<Candidate>
  ) {}

  async create(createCandidateDto: CreateCandidateDto) {
     console.log(createCandidateDto);
     const candidate = CreateCandidateDto.toCandidate(createCandidateDto);
     let created = await candidate.save();
     return created;
  }

  async findAll(query: PaginateQuery): Promise<Paginated<Candidate>> {
    return paginate(query, this. candidateRepo, {
      sortableColumns: ['id', 'personal_details'],
      searchableColumns: ['personal_details'],
      defaultSortBy: [['id', 'DESC']]
    })
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
