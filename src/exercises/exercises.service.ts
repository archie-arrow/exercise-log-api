import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPayloadDto } from 'src/auth/dto/user-payload.dto';
import { CreateExerciseDto } from 'src/exercises/dto/create-exercise.dto';
import { UpdateExerciseDto } from 'src/exercises/dto/update-exercise.dto';
import { Exercise, ExerciseDocument } from 'src/exercises/exercises.schema';

@Injectable()
export class ExercisesService {
  constructor(@InjectModel(Exercise.name) private exerciseModel: Model<ExerciseDocument>) {}

  async createExercise(createExerciseDto: CreateExerciseDto, userPayload: UserPayloadDto): Promise<Exercise> {
    return this.exerciseModel.create({ ...createExerciseDto, userId: userPayload.id });
  }

  async getAllExercises(userPayload: UserPayloadDto): Promise<Exercise[]> {
    return this.exerciseModel.find({ userId: userPayload.id });
  }

  async getExerciseById(id: string): Promise<Exercise> {
    return this.exerciseModel.findById(id);
  }

  async deleteExercise(id: string): Promise<null> {
    return this.exerciseModel.findByIdAndDelete(id, { new: true });
  }

  async updateExercise(updateExerciseDto: UpdateExerciseDto, id: string): Promise<Exercise> {
    return this.exerciseModel.findByIdAndUpdate(id, { ...updateExerciseDto }, { new: true });
  }
}
