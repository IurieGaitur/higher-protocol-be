import { Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

export class Likes {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    post_id: number;
    @Column()
    user_id: number;
}