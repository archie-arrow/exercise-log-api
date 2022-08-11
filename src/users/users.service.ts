import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User, UserDocument } from 'src/users/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUserByEmail(email: string, selectPassword = false): Promise<User> {
    return this.userModel.findOne({ email }).select(selectPassword ? '+password' : '');
  }

  async getUserById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto);
  }
}
