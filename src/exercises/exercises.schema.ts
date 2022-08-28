import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Difficulty } from 'src/enums/difficulty.enum';
import { ExerciseRegion } from 'src/enums/exercise-region.enum';
import { WeightType } from 'src/enums/weight-type.enum';
import { User } from 'src/users/users.schema';

export type ExerciseDocument = Exercise & Document;

@Schema({
  toJSON: {
    virtuals: true,
    transform: function (doc: any, ret: any) {
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class Exercise {
  @ApiProperty({ example: 'Pull up' })
  @Prop()
  name: string;

  @ApiProperty({ example: 'Description', required: false })
  @Prop({ required: false })
  description: string;

  @ApiProperty({ example: Difficulty.Easy, enum: Difficulty })
  @Prop()
  difficulty: Difficulty;

  @ApiProperty({ example: WeightType.BodyWeight, enum: WeightType })
  @Prop()
  weightType: WeightType;

  @ApiProperty({ example: ExerciseRegion.Arms, enum: ExerciseRegion })
  @Prop()
  primaryRegion: ExerciseRegion;

  @ApiProperty({ example: ExerciseRegion.Cardio, enum: ExerciseRegion, required: false })
  @Prop({ required: false })
  secondaryRegion: ExerciseRegion;

  @ApiProperty({ example: '62f1143409793deaec166cad' })
  id: string;

  @ApiProperty({ example: '62f1143409793deaec166cad', type: String })
  @Prop({ type: SchemaTypes.ObjectId, ref: () => User })
  userId: Types.ObjectId;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);
