import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserPayloadDto } from 'src/auth/dto/user-payload.dto';
import { UserPayload } from 'src/decorators/user-payload.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreateWorkoutDto } from 'src/workouts/dto/create-workout.dto';
import { UpdateWorkoutDto } from 'src/workouts/dto/update-workout.dto';
import { WorkoutsService } from 'src/workouts/workouts.service';
import { Workout } from 'src/workouts/workouts.schema';

@ApiTags('Workouts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('workouts')
export class WorkoutsController {
  constructor(private workoutsService: WorkoutsService) {}

  @ApiResponse({ type: [Workout] })
  @ApiOperation({ description: 'Get user workouts' })
  @Get()
  getWorkouts(@UserPayload() userPayload: UserPayloadDto): Promise<Workout[]> {
    return this.workoutsService.getWorkouts(userPayload);
  }

  @ApiResponse({ type: Workout })
  @ApiOperation({ description: 'Get workout by id' })
  @Get(':id')
  getWorkoutById(@Param('id') id: string): Promise<Workout> {
    return this.workoutsService.getWorkoutById(id);
  }

  @ApiResponse({ type: Workout })
  @ApiOperation({ description: 'Create workouts' })
  @Post()
  createWorkout(@Body() createSetDto: CreateWorkoutDto, @UserPayload() userPayload: UserPayloadDto): Promise<Workout> {
    return this.workoutsService.createWorkout(createSetDto, userPayload);
  }

  @ApiResponse({ type: null, status: HttpStatus.NO_CONTENT })
  @ApiOperation({ description: 'Update workouts' })
  @Patch(':id')
  updateWorkout(@Body() updateSetDto: UpdateWorkoutDto, @Param('id') id: string): Promise<Workout> {
    return this.workoutsService.updateWorkout(updateSetDto, id);
  }

  @ApiResponse({ type: null, status: HttpStatus.NO_CONTENT })
  @ApiOperation({ description: 'Delete workouts' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteWorkout(@Param('id') id: string): Promise<null> {
    return this.workoutsService.deleteWorkout(id);
  }
}
