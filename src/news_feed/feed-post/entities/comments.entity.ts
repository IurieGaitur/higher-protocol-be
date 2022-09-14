import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Comments {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    post_id: number;
    @Column()
    comment: string;
}
