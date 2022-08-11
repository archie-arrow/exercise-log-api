import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserPayloadDto } from 'src/auth/dto/user-payload.dto';
import { UserPayload } from 'src/decorators/user-payload.decorator';
import { CreateExerciseDto } from 'src/exercises/dto/create-exercise.dto';
import { UpdateExerciseDto } from 'src/exercises/dto/update-exercise.dto';
import { Exercise } from 'src/exercises/exercises.schema';
import { ExercisesService } from 'src/exercises/exercises.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@ApiTags('Exercises')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('exercises')
export class ExercisesController {
  constructor(private exercisesService: ExercisesService) {}

  @ApiResponse({ type: Exercise })
  @ApiOperation({ description: 'Create exercise' })
  @Post()
  createExercise(@Body() dto: CreateExerciseDto, @UserPayload() user: UserPayloadDto): Promise<Exercise> {
    return this.exercisesService.createExercise(dto, user);
  }

  @ApiResponse({ type: Exercise })
  @ApiOperation({ description: 'Update exercise' })
  @Patch(':id')
  updateExercise(@Param('id') id: string, @Body() updateExerciseDto: UpdateExerciseDto): Promise<Exercise> {
    return this.exercisesService.updateExercise(updateExerciseDto, id);
  }

  @ApiResponse({ type: [Exercise] })
  @ApiOperation({ description: 'Get all exercises' })
  @Get()
  getAllExercises(@UserPayload() user: UserPayloadDto): Promise<Exercise[]> {
    return this.exercisesService.getAllExercises(user);
  }

  @ApiResponse({ type: Exercise })
  @ApiOperation({ description: 'Get exercise' })
  @Get(':id')
  getExerciseById(@Param('id') id: string): Promise<Exercise> {
    return this.exercisesService.getExerciseById(id);
  }

  @ApiResponse({ type: null, status: HttpStatus.NO_CONTENT })
  @ApiOperation({ description: 'Delete exercise' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteExercise(@Param('id') id: string): Promise<null> {
    return this.exercisesService.deleteExercise(id);
  }
}
