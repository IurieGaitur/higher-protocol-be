import { Job } from "../entities/job.entity";

export class CreateJobDto {

    job_name: string;
    post_date: Date;
    expire_date: Date;
    location: string;
    description: string;
    category: number;
    block_hash: string;
    reward: number;
    contract_conditions: string;

    static toJob(jobDto: CreateJobDto) {
        const job = new Job();
        Object.assign(job, jobDto);
        return job;
    }

}
