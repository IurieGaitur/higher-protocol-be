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
    released: number;

    @Column()
    job_id: number;

    fromHedera(rawMessage: any): JobContract {
        this.id = rawMessage.getUint256(0).toString();
        this.condition = rawMessage.getString(1).toString();
        this.value = rawMessage.getUint256(2).toString();
        this.min_points = rawMessage.getUint256(3).toString();
        this.task = rawMessage.getString(4);
        this.description = rawMessage.getString(5);
        this.released = rawMessage.getBool(7);
        return this;
    }
}
