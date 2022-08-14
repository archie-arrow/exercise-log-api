import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserPayloadDto } from 'src/auth/dto/user-payload.dto';
import { UserPayload } from 'src/decorators/user-payload.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
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
}
