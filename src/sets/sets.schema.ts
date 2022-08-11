import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Difficulty } from 'src/enums/difficulty.enum';
import { WeightType } from 'src/enums/weight-type.enum';
import { Exercise } from 'src/exercises/exercises.schema';
import { User } from 'src/users/users.schema';

export type SetDocument = Set & Document;

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
export class Set {
  @ApiProperty({ example: 'Day 1: Legs' })
  @Prop()
  name: string;

  @ApiProperty({ type: [Exercise] })
  @Prop()
  exercises: Exercise[];

  @ApiProperty({ default: 0, example: '1' })
  @Prop({ default: 0 })
  repeated: number;

  @ApiProperty({ example: '62f1143409793deaec166cad', type: SchemaTypes.String })
  @Prop({ type: SchemaTypes.ObjectId, ref: () => User })
  userId: Types.ObjectId;

  @ApiProperty({ example: '62f1143409793deaec166cad' })
  id: string;

  @ApiProperty({ example: '1' })
  exercisesCount: number;

  @ApiProperty({ example: 'Easy', enum: Difficulty })
  difficulty: Difficulty;

  @ApiProperty({ example: 'true' })
  withAdditionalEquipment: boolean;
}

export const SetSchema = SchemaFactory.createForClass(Set);

SetSchema.virtual('exercisesCount').get(function (this: SetDocument) {
  return this.exercises.length;
});

SetSchema.virtual('withAdditionalEquipment').get(function (this: SetDocument) {
  return this.exercises.some((exercise: Exercise) => exercise.weightType !== WeightType.BodyWeight);
});

SetSchema.virtual('difficulty').get(function (this: SetDocument) {
  if (!this.exercises.length) return Difficulty.Easy;
  const difficulties = [
    {
      name: Difficulty.Easy,
      count: this.exercises.filter((exercise) => exercise.difficulty === Difficulty.Easy).length,
    },
    {
      name: Difficulty.Medium,
      count: this.exercises.filter((exercise) => exercise.difficulty === Difficulty.Medium).length,
    },
    {
      name: Difficulty.Hard,
      count: this.exercises.filter((exercise) => exercise.difficulty === Difficulty.Hard).length,
    },
  ];

  return difficulties.reduce((prev, curr) => (curr.count > prev.count ? curr : prev)).name;
});
