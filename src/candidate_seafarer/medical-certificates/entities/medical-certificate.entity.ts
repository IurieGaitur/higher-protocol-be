import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("med_certificates")
export class MedicalCertificate {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    user_id: number;
    @Column()
    name: string;
    @Column()
    issue_by: string;
    @Column()
    date_issue: Date;
    @Column()
    valid_until: Date;
    @Column()
    med_dile: string;
}
