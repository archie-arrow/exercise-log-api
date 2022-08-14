import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail({}, { message: 'Please, provide valid email!' })
  @ApiProperty({ example: 'john.doe@gmail.com' })
  email: string;
}
