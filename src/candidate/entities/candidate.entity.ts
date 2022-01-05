import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("candidates")
export class Candidate extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    personal_details: string;
    @Column()
    about: string;
    @Column()
    experiences: string;
    @Column()
    degree: string;
    @Column()
    licences: string;
    @Column()
    hard_skills: string;
    @Column()
    soft_skills: string;
    @Column()
    position: string;
    @Column()
    starting_date: Date;
    @Column()
    location: string;
    @Column()
    is_remote: boolean;
    @Column()
    match_score: number;

    @Column()
    user_id: number;
}
