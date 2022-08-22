import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Exercise, ExerciseSchema } from 'src/exercises/exercises.schema';
import { Progress, ProgressSchema } from 'src/progress/progress.schema';
import { Set, SetSchema } from 'src/progress/sets.schema';
import { Workout, WorkoutSchema } from 'src/workouts/workouts.schema';
import { User, UserSchema } from 'src/users/users.schema';

export const MODELS = [
  { name: User.name, schema: UserSchema },
  { name: Exercise.name, schema: ExerciseSchema },
  { name: Workout.name, schema: WorkoutSchema },
  { name: Progress.name, schema: ProgressSchema },
  { name: Set.name, schema: SetSchema },
];

@Module({
  imports: [MongooseModule.forFeature(MODELS)],
  exports: [MongooseModule.forFeature(MODELS)],
})
export class DatabaseModule {}
