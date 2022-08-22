import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserPayloadDto } from 'src/auth/dto/user-payload.dto';
import { BatchDeleteProgressDto } from 'src/progress/dto/batch-delete-progress.dto';
import { CreateProgressDto, ExerciseProgressDto } from 'src/progress/dto/create-progress.dto';
import { Progress, ProgressDocument } from 'src/progress/progress.schema';
import { WorkoutsService } from 'src/workouts/workouts.service';

@Injectable()
export class ProgressService {
  constructor(
    @InjectModel(Progress.name) private progressModel: Model<ProgressDocument>,
    private workoutsService: WorkoutsService,
  ) {}

  async addProgress(createProgressDto: CreateProgressDto, userPayload: UserPayloadDto): Promise<Progress[]> {
    const { exercises, date, workoutId } = createProgressDto;
    const userId = userPayload.id;
    const performedExercises = exercises.map((exercise: ExerciseProgressDto) => ({ ...exercise, date, userId }));

    if (workoutId) {
      await this.workoutsService.incrementWorkoutRepeats(workoutId);
    }

    return this.progressModel.create(performedExercises);
  }

  async getProgress(userPayload: UserPayloadDto): Promise<Progress[]> {
    return this.progressModel.find({ userId: userPayload.id }).sort({ date: 1 });
  }

  async getExerciseProgress(id: string): Promise<Progress[]> {
    return this.progressModel.find({ exerciseId: id }).sort({ date: 1 });
  }

  async deleteProgress(id: string): Promise<Progress> {
    return this.progressModel.remove({ id: new Types.ObjectId(id) });
  }

  async batchDeleteProgress(batchDeleteProgressDto: BatchDeleteProgressDto): Promise<Progress[]> {
    return this.progressModel.remove({
      id: { $in: batchDeleteProgressDto.ids.map((id: string) => new Types.ObjectId(id)) },
    });
  }
}
