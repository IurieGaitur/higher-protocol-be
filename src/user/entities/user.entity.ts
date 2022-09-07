import { Exclude } from "class-transformer";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("users")
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
    @Column()
    first_name: string;
    @Column()
    last_name: string;
    @Column()
    category: number;
    @Column({ nullable: true })
    image: string;
    @Exclude()
    @Column()
    password: string;
    @Column()
    created_at: Date;
    
    @Column({ nullable: true })
    company_id: number;
    @Column({ nullable: true })
    status: string;
    @Column({ nullable: true })
    position: string;
    @Column({ nullable: true })
    background_img: string;
}
