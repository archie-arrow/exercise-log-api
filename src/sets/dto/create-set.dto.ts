import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Exercise } from 'src/exercises/exercises.schema';

export class CreateSetDto {
  @ApiProperty({ example: 'Day 1: Legs' })
  @IsString({ message: 'Should be a string!' })
  readonly name: string;

  @ApiProperty({ type: [Exercise] })
  @IsArray({ message: 'Should be an array!' })
  @ValidateNested({ each: true })
  @Type(() => Exercise)
  readonly exercises: Exercise[];
}
