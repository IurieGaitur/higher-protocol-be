import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("educations")
export class Education {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    user_id: number;
    @Column()
    from: Date;
    @Column()
    to: Date;
    @Column({nullable: true})
    file_education: string;
}