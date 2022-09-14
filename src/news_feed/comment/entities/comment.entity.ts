import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Comment {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    creator_id: number;
    @Column()
    created_at: Date;
    @Column()
    text: string;
}
