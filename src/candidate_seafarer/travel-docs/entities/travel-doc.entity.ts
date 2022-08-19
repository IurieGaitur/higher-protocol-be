import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("travel_documents")
export class TravelDoc {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    user_id: number;
    @Column()
    type: string;
    @Column()
    number_doc: string;
    @Column()
    valid_until: Date;
    @Column()
    file_doc: string;
}
