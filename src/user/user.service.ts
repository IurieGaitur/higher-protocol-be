import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  async create(createUserDto: CreateUserDto) {
    let newUser = CreateUserDto.toUser(createUserDto);
    const addedUser = await newUser.save()
    return addedUser;
  }

  async findByIdAndEmail(id: number, email: string) {
    const user = await User.findOneBy({'id': id, 'email': email});
    if (!user) {
      throw new HttpException('User is not existent', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  async findAll() {
    const users = await User.find();
    return users;
  }

  async findOne(email: string) {
    const user = await User.findOneBy({'email': email});
    return user;
  }

  async findOneById(id: number) {
    const user = await User.findOneBy({'id': id});
    return user;
  }

  async getOrCreate(email: string, firstName: string, lastName: string, image: string, category: number, 
    provider: string) {
    if (provider != null && provider == 'google' || provider == 'fb' || provider == 'linkedin') {
      let user = await User.findOneBy({'email': email});
      if (user == null) {
        let userDTO = new CreateUserDto(email, "null", firstName, lastName, category);
        userDTO.image = image;
        userDTO.provider = provider;
        user = await this.create(userDTO);
      }
      delete user["password"];
      delete user["provider"];

      return user;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // updateUserDto.id = id
    // let newUser = updateUserDto.toUser();
    // const addedUser = await newUser.save();
    // return addedUser;
  }

  async remove(id: number) {
    await User.delete(id);
  }
}
