import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, ValidateNested } from 'class-validator';

export class CreateWorkoutDto {
  @ApiProperty({ example: 'Day 1: Legs' })
  @IsString({ message: 'Should be a string!' })
  readonly name: string;

  @ApiProperty({ type: [String], example: ['id1', 'id2'] })
  @IsArray({ message: 'Should be an array!' })
  readonly exercises: string[];
}
