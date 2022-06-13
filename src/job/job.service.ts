import { ContractId } from '@hashgraph/sdk';
import { Injectable } from '@nestjs/common';
import { CreateCandidateDto } from 'src/candidate/dto/create-candidate.dto';
import { CreateContractDto } from './dto/create-contract.dto';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './entities/job.entity';
import { JobContract } from './entities/job_contract.entity';
import AccountCreation from './model/account-creation.hedera';
import JobContractModel from './model/job-contract.hedera';
import * as fs from 'fs';

@Injectable()
export class JobService {

  jobModel: JobContractModel;
  contractId: ContractId;

  constructor() {
    this.jobModel = new JobContractModel()
    this.jobModel.connectHedera().then(it => this.contractId = this.jobModel.tryLoadContract());
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

  async findOne(id: number): Promise<Job> {
    const job = await Job.findOneBy({'id': id});
    return job;
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  async remove(id: number) {
    await Job.delete(id);
  }

  async deployContract() {
    const contract = await this.jobModel.deployJobContract();
    this.contractId = contract.contractObj;
    //Store the string repr. of the file on local
    const path = "config/hedera_contract.txt"
    fs.writeFile(path, contract.contractString, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  async createContract(contract: CreateContractDto) {
    const createdContractHash = await this.jobModel.createHederaContract(this.contractId, contract);
    var jobContract = CreateContractDto.toJobContract(contract);
    jobContract.hash_value = createdContractHash;
    await jobContract.save();
    return jobContract;
  }

  async getContract(job_id: number) {
      const jobHedera = await this.jobModel.getJobContract(this.contractId, job_id);
      let savedJob = await JobContract.findOneBy({'job_id': job_id});
      if (savedJob) {
        jobHedera.hash_value = savedJob.hash_value;
      }
      return jobHedera;
  }
}
