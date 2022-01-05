import { User } from "../entities/user.entity";

export class CreateUserDto {

    email: string;
    first_name: string;
    last_name: string;
    category: number;
    image: string;

    toUser(): User {
        const user = new User();
        Object.assign(user, this);
        return user;
    }
}
