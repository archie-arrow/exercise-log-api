import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ExercisesModule } from 'src/exercises/exercises.module';
import { WorkoutsController } from 'src/workouts/workouts.controller';
import { WorkoutsService } from 'src/workouts/workouts.service';

@Module({
  imports: [DatabaseModule, ExercisesModule],
  controllers: [WorkoutsController],
  providers: [WorkoutsService],
  exports: [WorkoutsService],
})
export class WorkoutsModule {}
