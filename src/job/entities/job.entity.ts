import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("jobs")
export class Job extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    job_name: string;
    @Column()
    post_date: Date;
    @Column()
    expire_date: Date;
    @Column()
    location: string;
    @Column()
    description: string;
    @Column()
    category: number;
    @Column()
    block_hash: string;
    @Column()
    reward: number;
    @Column()
    contract_conditions: string;
}
