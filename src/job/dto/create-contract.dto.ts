import { ApiProperty } from "@nestjs/swagger";
import { JobContract } from "../entities/job_contract.entity";

export class CreateContractDto {

    @ApiProperty()
    condition: string;

    @ApiProperty()
    value: string;

    @ApiProperty()
    min_points: number;

    @ApiProperty()
    task: string;

    @ApiProperty()
    description: string;

    created_at: Date;

    @ApiProperty()
    hash_value: string;

    @ApiProperty()
    job_id: number;

    released: number;

    static toJobContract(jobContractDto: CreateContractDto) {
        const contract = new JobContract();
        Object.assign(contract, jobContractDto);
        contract.created_at = new Date();
        contract.released = 0;
        return contract;
    }

}