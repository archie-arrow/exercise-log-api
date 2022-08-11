import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from 'src/auth/dto/auth-response.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { UserPayloadDto } from 'src/auth/dto/user-payload.dto';
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

  private async validateUser(dto: LoginDto): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.getUserByEmail(dto.email, true);
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
