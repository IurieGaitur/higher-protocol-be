import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("job_contracts")
export class JobContract extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    condition: string;
    @Column()
    value: string;
    @Column()
    min_points: number;
    @Column()
    task: string;
    @Column()
    description: string;
    @Column()
    created_at: Date;
    @Column()
    hash_value: string;
    
    @Column()
    job_id: number;
}
