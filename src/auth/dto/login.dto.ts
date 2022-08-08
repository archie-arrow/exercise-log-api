import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Please, provide valid email!' })
  @ApiProperty({ example: 'john.doe@gmail.com' })
  readonly email: string;

  @IsString({ message: 'Must be a string!' })
  @ApiProperty({ example: 'pwrd1234' })
  readonly password: string;
}
