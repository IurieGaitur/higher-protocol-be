import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
export type User = any;

@Injectable()
export class UsersService {
    private readonly users = [
        {
          userId: 1,
          email: 'test1@gmail.com',
          pass: '123456',
        },
        {
          userId: 2,
          email: 'test1@gmail.com',
          pass: '123456',
        },
      ];
    
      async findOne(email: string): Promise<User | undefined> {
        const user = this.users.find(user => user.email === email);
        return user;
      }
}
