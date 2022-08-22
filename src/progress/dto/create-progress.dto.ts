import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDateString, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Set } from 'src/progress/sets.schema';

export class ExerciseProgressDto {
  @ApiProperty({ type: [Set] })
  @IsArray({ message: 'Should be an array!' })
  @ValidateNested({ each: true })
  @Type(() => Set)
  readonly sets: Set[];

  @ApiProperty({ example: '62f1143409793deaec166cad' })
  @IsString({ message: 'Should be a string!' })
  readonly exerciseId: string;
}

export class CreateProgressDto {
  @ApiProperty({ example: '62f1143409793deaec166cad', required: false })
  @IsOptional()
  @IsString({ message: 'Should be a string!' })
  readonly workoutId?: string;

  @ApiProperty({ example: '2019-06-11', required: false, default: new Date() })
  @IsOptional()
  @IsDateString({ message: 'Should be a date string!' })
  readonly date?: Date;

  @ApiProperty({ type: [ExerciseProgressDto] })
  @IsArray({ message: 'Should be an array!' })
  @ValidateNested({ each: true })
  @Type(() => ExerciseProgressDto)
  readonly exercises: ExerciseProgressDto[];
}
