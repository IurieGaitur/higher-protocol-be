import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    
      constructor(
        private usersService: UserService,
        private jwtService: JwtService
      ) {}

      async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(email);
        if (user && user.password === pass) {
          return user;
        }
        return null;
      }
    
      async login(email: string, pass: string) {
        const userExists = await this.validateUser(email, pass);
        console.log("Tried to check 2");
        if (userExists) {
          const payload = { email: email, id: userExists.id };
          const user = await this.usersService.findOne(email);
          delete user.password;
          
          return {
            access_token: this.jwtService.sign(payload),
            ...user
          };
        } else {
          throw new HttpException("Email or password are incorrect", HttpStatus.UNAUTHORIZED);
        }
      }

      async register(createUserDto: CreateUserDto) {
        const user = await this.usersService.findOne(createUserDto.email);
        if (user) {
          throw new HttpException("User with this email or password exists.", HttpStatus.UNAUTHORIZED);
        }
        let createdUser = await this.usersService.create(createUserDto);
        if (!createdUser) {
          throw new HttpException("Could not create the user", HttpStatus.BAD_REQUEST);
        }
        return createdUser;
      }
}
