import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsString({ message: 'Should be a string!' })
  @MinLength(8, { message: 'Min length is 8' })
  @MaxLength(16, { message: 'Max length is 16' })
  @ApiProperty({ example: 'john.doe@gmail.com' })
  password: string;

  @IsString({ message: 'Should be a string!' })
  @ApiProperty({ example: 'ajlsghlasgjkals;125o;ja;lsfjklasj' })
  token: string;
}
