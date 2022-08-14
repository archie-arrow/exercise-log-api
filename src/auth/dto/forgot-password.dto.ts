import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ForgotPasswordDto {
  @IsEmail({ message: 'Please, provide a valid email!' })
  @ApiProperty({ example: 'john.doe@gmail.com' })
  email: string;
}
