import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOneId(id: Types.ObjectId): Promise<User> {
    return await this.userModel.findOne({ _id: id });
  }

  async findAll(filterObject: GetUserDto = {}): Promise<User[]> {
    return await this.userModel.find(filterObject);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await new this.userModel(createUserDto).save();
  }
}
