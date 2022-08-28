import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { AuthResponseDto } from 'src/auth/dto/auth-response.dto';
import { ForgotPasswordDto } from 'src/auth/dto/forgot-password.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ResetPasswordDto } from 'src/users/dto/reset-password.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse({ type: AuthResponseDto, status: HttpStatus.OK })
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

  @ApiResponse({ type: AuthResponseDto })
  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto): Promise<AuthResponseDto> {
    return this.authService.register(createUserDto);
  }

  @ApiResponse({ type: null, status: HttpStatus.NO_CONTENT })
  @ApiOperation({ description: 'Reset user password' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/forgot-password')
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @ApiResponse({ type: null, status: HttpStatus.NO_CONTENT })
  @ApiOperation({ description: 'Get current user' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<void> {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
