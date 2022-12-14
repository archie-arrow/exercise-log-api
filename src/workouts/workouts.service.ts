import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPayloadDto } from 'src/auth/dto/user-payload.dto';
import { ExercisesService } from 'src/exercises/exercises.service';
import { CreateWorkoutDto } from 'src/workouts/dto/create-workout.dto';
import { UpdateWorkoutDto } from 'src/workouts/dto/update-workout.dto';
import { WorkoutDocument, Workout } from 'src/workouts/workouts.schema';

@Injectable()
export class WorkoutsService {
  constructor(@InjectModel(Workout.name) private workoutModel: Model<WorkoutDocument>, private exerciseService: ExercisesService) { }

  async getWorkouts(userPayload: UserPayloadDto): Promise<Workout[]> {
    return this.workoutModel.find({ userId: userPayload.id });
  }

  async getWorkoutById(id: string): Promise<Workout> {
    return this.workoutModel.findById(id);
  }

  async createWorkout(createWorkoutDto: CreateWorkoutDto, userPayload: UserPayloadDto): Promise<Workout> {
    return this.workoutModel.create({
      ...createWorkoutDto,
      userId: userPayload.id,
      exercises: await this.exerciseService.getManyExercisesById(createWorkoutDto.exercises)
    });
  }

  async deleteWorkout(id: string): Promise<null> {
    return this.workoutModel.findByIdAndDelete(id, { new: true });
  }

  async updateWorkout(updateWorkoutDto: UpdateWorkoutDto, id: string): Promise<Workout> {
    return this.workoutModel.findByIdAndUpdate(id, { ...updateWorkoutDto }, { new: true });
  }

  async incrementWorkoutRepeats(id: string): Promise<null> {
    return this.workoutModel.findByIdAndUpdate(id, { $inc: { repeated: 1 } }, { new: true });
  }
}
