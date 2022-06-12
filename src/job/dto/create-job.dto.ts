import { ApiProperty } from "@nestjs/swagger";
import { Job } from "../entities/job.entity";


export class CreateJobDto {

    @ApiProperty()
    job_name: string;

    @ApiProperty()
    post_date: Date;

    @ApiProperty()
    expire_date: Date;

    @ApiProperty()
    location: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    category: number;

    @ApiProperty()
    block_hash: string;

    @ApiProperty()
    reward: number;

    @ApiProperty()
    contract_conditions: string;

    static toJob(jobDto: CreateJobDto) {
        const job = new Job();
        Object.assign(job, jobDto);
        return job;
    }

}
