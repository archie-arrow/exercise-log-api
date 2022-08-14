import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from 'src/auth/dto/auth-response.dto';
import { ForgotPasswordDto } from 'src/auth/dto/forgot-password.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { UserPayloadDto } from 'src/auth/dto/user-payload.dto';
import { MailService } from 'src/mail/mail.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ResetPasswordDto } from 'src/users/dto/reset-password.dto';
import { User } from 'src/users/users.schema';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService, private mailService: MailService) {}

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.validateUser(loginDto);
    return {
      user,
      token: this.jwtService.sign(this.createTokenPayload(user)),
    };
  }

  async register(registerDto: CreateUserDto): Promise<AuthResponseDto> {
    const candidate = await this.usersService.getUserByEmail(registerDto.email);
    if (candidate) {
      throw new HttpException('User with this email already exist!', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(registerDto.password, 12);
    const user = await this.usersService.createUser({
      ...registerDto,
      password: hashPassword,
    });

    const { password, ...responseUser } = JSON.parse(JSON.stringify(user));

    return {
      user: responseUser,
      token: this.jwtService.sign(this.createTokenPayload(user)),
    };
  }

  async forgotPassword({ email }: ForgotPasswordDto, url: URL): Promise<void> {
    const user = await this.usersService.getUserByEmail(email);
    if (user) {
      const token = this.jwtService.sign(this.createTokenPayload(user), { expiresIn: '1h' });
      url.searchParams.append('token', token);

      await this.mailService.sendResetPassword(user, token, url.toString());
      await this.usersService.setResetToken(user, token);
    }
    return;
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    try {
      const tokenPayload = await this.jwtService.verify(resetPasswordDto.token);
      const hashPassword = await bcrypt.hash(resetPasswordDto.password, 12);
      await this.usersService.resetUserPassword(tokenPayload.id, hashPassword);
      return;
    } catch (e) {
      throw new BadRequestException('Token is expired or incorrect!');
    }
  }

  private async validateUser(dto: LoginDto): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.getUserByEmail(dto.email, ['+password']);
    if (!user) throw new UnauthorizedException({ message: 'Wrong email or password!' });

    const { password, ...responseUser } = JSON.parse(JSON.stringify(user));
    const passwordEquals = await bcrypt.compare(dto.password, password);
    if (user && passwordEquals) {
      return responseUser;
    }
    throw new UnauthorizedException({ message: 'Wrong email or password!' });
  }

  private createTokenPayload(user: User | Omit<User, 'password'>): UserPayloadDto {
    return { id: user.id };
  }
}
