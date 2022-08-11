import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ExercisesController],
  providers: [ExercisesService, JwtAuthGuard],
})
export class ExercisesModule {}
