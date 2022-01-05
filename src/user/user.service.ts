import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  async create(createUserDto: CreateUserDto) {
    let newUser = createUserDto.toUser();
    const addedUser = await newUser.save()
    return addedUser;
  }

  async findAll() {
    const users = await User.find();
    return users;
  }

  async findOne(id: number) {
    const user = await User.findOne({'id': id});
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    updateUserDto.id = id
    let newUser = updateUserDto.toUser();
    const addedUser = await newUser.save();
    return addedUser;
  }

  async remove(id: number) {
    await User.delete(id);
  }
}
