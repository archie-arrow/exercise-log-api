import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Exercise, ExerciseSchema } from 'src/exercises/exercises.schema';
import { Set, SetSchema } from 'src/sets/sets.schema';
import { User, UserSchema } from 'src/users/users.schema';

export const MODELS = [
  { name: User.name, schema: UserSchema },
  { name: Exercise.name, schema: ExerciseSchema },
  { name: Set.name, schema: SetSchema },
];

@Module({
  imports: [MongooseModule.forFeature(MODELS)],
  exports: [MongooseModule.forFeature(MODELS)],
})
export class DatabaseModule {}
