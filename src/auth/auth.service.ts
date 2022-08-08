import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from 'src/auth/dto/auth-response.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/users.schema';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.validateUser(loginDto);
    return {
      user,
      token: this.jwtService.sign({ ...user }),
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

    return {
      user,
      token: this.jwtService.sign({ ...user }),
    };
  }

  private async validateUser(dto: LoginDto): Promise<User> {
    const user = await this.usersService.getUserByEmail(dto.email);
    if (!user) throw new UnauthorizedException({ message: 'Wrong email or password!' });

    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Wrong email or password!' });
  }
}
