import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("experiences")
export class Experience {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    user_id: number;
    @Column()
    rank: number;
    @Column()
    company_id: number;
    @Column()
    vessel_type: string;
    @Column()
    duration: number;
    @Column()
    valid_status: string;
    @Column({nullable: true})
    file_experience: string;
}