import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("comments")
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    post_id: number;
    @Column()
    created_at: Date;
    @Column()
    comment: string;
}
