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
    @Column()
    image: string;
}
