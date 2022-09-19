import { Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


export class PostReaction {
    @PrimaryGeneratedColumn()
    id: string;
    @Column()
    comments_nr: number;
    @Column()
    likes_nr: number;
    @Column()
    shares_nr: number;
    @Column()
    post_id: number;
}