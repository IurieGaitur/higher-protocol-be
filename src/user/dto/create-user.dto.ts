import { ApiProperty } from "@nestjs/swagger";
import { User } from "../entities/user.entity";

export class CreateUserDto {

    @ApiProperty()
    email: string;
    
    @ApiProperty()
    first_name: string;
    
    @ApiProperty()
    last_name: string;
    
    @ApiProperty()
    category: number;
    
    @ApiProperty()
    image: string;
    
    @ApiProperty()
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
