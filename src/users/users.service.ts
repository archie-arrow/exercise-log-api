import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User, UserDocument } from 'src/users/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUserByEmail(email: string, selectOptions: string[] = []): Promise<User> {
    return this.userModel.findOne({ email }).select(selectOptions);
  }

  async getUserById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto);
  }

  async setResetToken({ id }: User, token: string): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, { resetToken: token }, { new: true });
  }

  async resetUserPassword(id: string, password: string): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, { password, resetToken: undefined }, { new: true });
  }
}
