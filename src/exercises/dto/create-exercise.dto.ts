import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Difficulty } from 'src/enums/difficulty.enum';
import { ExerciseRegion } from 'src/enums/exercise-region.enum';
import { WeightType } from 'src/enums/weight-type.enum';

export class CreateExerciseDto {
  @ApiProperty({ example: 'Pull up' })
  @IsString({ message: 'Should be a string!' })
  readonly name: string;

  @ApiProperty({ example: 'Description', required: false })
  @IsOptional()
  @IsString({ message: 'Should be a string!' })
  readonly description?: string;

  @ApiProperty({ example: Difficulty.Easy, enum: Difficulty })
  @IsEnum(Difficulty)
  readonly difficulty: Difficulty;

  @ApiProperty({ example: WeightType.BodyWeight, enum: WeightType })
  @IsEnum(WeightType)
  readonly weightType: WeightType;

  @ApiProperty({ example: ExerciseRegion.Shoulders, enum: ExerciseRegion })
  @IsEnum(ExerciseRegion)
  readonly primaryRegion: ExerciseRegion;

  @ApiProperty({ example: ExerciseRegion.Arms, enum: ExerciseRegion, required: false })
  @IsEnum(ExerciseRegion)
  readonly secondaryRegion: ExerciseRegion;
}
