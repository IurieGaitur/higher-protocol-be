import { Injectable } from '@nestjs/common';
import { CreateCandidateDto } from 'src/candidate/dto/create-candidate.dto';
import { CreateContractDto } from './dto/create-contract.dto';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './entities/job.entity';
import { JobContract } from './entities/job_contract.entity';
import AccountCreation from './model/account-creation.hedera';
import JobContractModel from './model/job-contract.hedera';


@Injectable()
export class JobService {

  constructor() {
    new JobContractModel().connectHedera()
  }

  create(createJobDto: CreateJobDto) {
    const newJob = CreateJobDto.toJob(createJobDto);
    const saved = newJob.save();
    return saved;
  }

  async findAll() {
    const jobs = await Job.find();
    return jobs;
  }

  async findOne(id: number) {
    const job = await Job.find({'id': id});
    return job;
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  async remove(id: number) {
    await Job.delete(id);
  }

  async createContract(contract: CreateContractDto) {
    

    return new JobContract();
  }

  async getContract(job_id: number) {
      const contract = await JobContract.find({'job_id': job_id});
      return contract;
  }
}
