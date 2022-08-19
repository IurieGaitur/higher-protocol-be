import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("record_sea_served")
export class RecordSeaServe {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    user_id: number;
    @Column()
    company_id: number;
    @Column()
    vessel_type: string;
    @Column()
    sign_date: Date;
    @Column()
    sign_off: Date;

}