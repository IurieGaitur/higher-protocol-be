import { Column, PrimaryGeneratedColumn } from "typeorm";

export class FeedPost {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    creator_id: number;
    @Column()
    created_at: Date;
    @Column()
    text: string;
    @Column()
    comments_nr: number;
    @Column()
    likes_nr: number;
    @Column()
    shares_nr: number;
}
