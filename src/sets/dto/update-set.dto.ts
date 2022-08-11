import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Exercise } from 'src/exercises/exercises.schema';

export class UpdateSetDto {
  @ApiProperty({ example: 'Day 1: Legs' })
  @IsOptional()
  @IsString({ message: 'Should be a string!' })
  readonly name?: string;

  @ApiProperty({ type: [Exercise] })
  @IsOptional()
  @IsArray({ message: 'Should be an array!' })
  @ValidateNested({ each: true })
  @Type(() => Exercise)
  readonly exercises?: Exercise[];
}
