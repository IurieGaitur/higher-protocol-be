import { JobContract } from "../entities/job_contract.entity";

export class CreateContractDto {

    condition: string;
    value: string;
    min_points: number;
    task: string;
    description: string;
    created_at: Date;
    hash_value: string;
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