import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("comments")
export class Comments {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    post_id: number;
    @Column()
    comment: string;
}
