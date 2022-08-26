import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { User } from "../entities/user.entity";

export class CreateUserDto {

    @IsEmail()
    @ApiProperty()
    email: string;
    
    @IsNotEmpty()
    @ApiProperty()
    first_name: string;
    
    @IsNotEmpty()
    @ApiProperty()
    last_name: string;
    
    @IsNotEmpty()
    @ApiProperty()
    category: number;
    
    @ApiProperty()
    image: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @Length(8, 14)
    password: string;
    
    @ApiProperty()
    created_at: Date;

    constructor(email:string, password:string, firstName:string, lastName:string, category:number) {
        this.email = email;
        this.password = password;
        this.first_name = firstName;
        this.last_name = lastName;
        this.category = category;
        this.image = "";
        this.created_at = new Date();
    }

    static toUser(createUser: CreateUserDto): User {
        const user = new User();
        Object.assign(user, createUser);
        user.image = "";
        user.created_at = new Date();
        return user;
    }
}
