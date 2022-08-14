import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MailService } from 'src/mail/mail.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ResetPasswordDto } from 'src/users/dto/reset-password.dto';
import { User, UserDocument } from 'src/users/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private mailService: MailService) {}

  async getUserByEmail(email: string, selectPassword = false): Promise<User> {
    return this.userModel.findOne({ email }).select(selectPassword ? '+password' : '');
  }

  async getUserById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto);
  }

  async forgotPassword({ email }: ResetPasswordDto, url: string): Promise<void> {
    const user = await this.getUserByEmail(email);
    if (user) {
      await this.mailService.sendResetPassword(user, '124124', url);
    }
    return;
  }
}
