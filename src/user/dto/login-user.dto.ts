import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { User } from "../entities/user.entity";

export class LoginUserDto {

    @ApiProperty()
    @IsEmail()
    email: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @Length(8, 14)
    password: string;

    constructor(email:string, password:string) {
        this.email = email;
        this.password = password;
    }
}
