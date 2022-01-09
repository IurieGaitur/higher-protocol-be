import { User } from "../entities/user.entity";

export class CreateUserDto {

    email: string;
    first_name: string;
    last_name: string;
    category: number;
    image: string;
    password: string

    constructor(email:string, password:string, firstName:string, lastName:string, category:number) {
        this.email = email;
        this.password = password;
        this.first_name = firstName;
        this.last_name = lastName;
        this.category = category;
        this.image = "";
    }

    toUser(): User {
        const user = new User();
        Object.assign(user, this);
        return user;
    }

    fromBody(body: any) {
        this.email = body.email;
        this.password = body.password;
        this.first_name = body.firstName;
        this.last_name = body.lastName;
        this.category = body.category;
        this.image = "";
    }
}
