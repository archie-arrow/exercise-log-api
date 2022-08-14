import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UserPayloadDto } from 'src/auth/dto/user-payload.dto';
import { UserPayload } from 'src/decorators/user-payload.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ResetPasswordDto } from 'src/users/dto/reset-password.dto';
import { User } from 'src/users/users.schema';
import { UsersService } from 'src/users/users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiResponse({ type: User })
  @ApiOperation({ description: 'Get current user' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/current')
  getUser(@UserPayload() userPayload: UserPayloadDto): Promise<User> {
    return this.usersService.getUserById(userPayload.id);
  }

  @ApiResponse({ type: null, status: HttpStatus.NO_CONTENT })
  @ApiOperation({ description: 'Reset user password' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('forgot-password')
  forgotPassword(@Body() resetPasswordDto: ResetPasswordDto, @Req() req: Request): Promise<void> {
    const resetPasswordUrl = req.protocol + '://' + req.get('host') + '/reset-password';
    return this.usersService.forgotPassword(resetPasswordDto, resetPasswordUrl);
  }
}
