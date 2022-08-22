import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { WorkoutsModule } from 'src/workouts/workouts.module';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';

@Module({
  imports: [DatabaseModule, WorkoutsModule],
  controllers: [ProgressController],
  providers: [ProgressService],
})
export class ProgressModule {}
