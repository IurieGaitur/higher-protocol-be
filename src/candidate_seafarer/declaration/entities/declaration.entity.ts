import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity("declarations")
export class Declaration {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    user_id: number;
    @Column()
    employ_dismiss: boolean;
    @Column()
    serious_illness: boolean;
    @Column()
    eyesight: boolean;
    @Column()
    convict_in_court: boolean;
}
