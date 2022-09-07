import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("certifications")
export class Certification {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    user_id: number;
    @Column()
    name: string;
    @Column()
    status: number;
    @Column()
    cert_number: string;
    @Column()
    valid_until: Date;
    @Column()
    type: number;
    @Column({nullable: true})
    file_cert: string;
}
