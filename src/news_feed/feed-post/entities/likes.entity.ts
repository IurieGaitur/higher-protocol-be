import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("likes")
export class Likes {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    post_id: number;
    @Column()
    user_id: number;
}