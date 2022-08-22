import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ExercisesModule } from './exercises/exercises.module';
import { DatabaseModule } from './database/database.module';
import { WorkoutsModule } from 'src/workouts/workouts.module';
import { MailModule } from './mail/mail.module';
import { ProgressModule } from './progress/progress.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: `${process.env.NODE_ENV}.env` }),
    MongooseModule.forRoot(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wa7gg.mongodb.net/exercise-log?retryWrites=true&w=majority`), // eslint-disable-line
    UsersModule,
    AuthModule,
    ExercisesModule,
    DatabaseModule,
    WorkoutsModule,
    MailModule,
    ProgressModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
