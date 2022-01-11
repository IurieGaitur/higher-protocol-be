import { User } from "../entities/user.entity";

export class CreateUserDto {

    email: string;
    first_name: string;
    last_name: string;
    category: number;
    image: string;
    password: string;
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
