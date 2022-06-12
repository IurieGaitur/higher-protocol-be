import { ApiProperty } from "@nestjs/swagger";
import { User } from "../entities/user.entity";

export class LoginUserDto {

    @ApiProperty()
    email: string;
    
    @ApiProperty()
    password: string;

    constructor(email:string, password:string) {
        this.email = email;
        this.password = password;
    }
}
