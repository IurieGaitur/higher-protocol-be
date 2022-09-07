import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("profiles")
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    user_id: number;
    @Column()
    rank: number;
    @Column()
    experience_year: number;
    @Column()
    vessel_type: number;
    @Column()
    phone: string;
    @Column()
    nationality: string;
    @Column()
    coverall_size: number;
    @Column()
    height: number;
    @Column()
    address: string;
    @Column()
    date_of_birth: Date;
    @Column()
    place_birth: string;
    @Column()
    religion: string;
    @Column()
    marit_status: string;
    @Column()
    weight: number;
    @Column()
    shoe_size: number;

}
