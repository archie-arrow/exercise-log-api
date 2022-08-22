import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Exercise } from 'src/exercises/exercises.schema';
import { Set, SetSchema } from 'src/progress/sets.schema';
import { User } from 'src/users/users.schema';

export type ProgressDocument = Progress & Document;

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
export class Progress {
  @ApiProperty({ example: '10-12-2022', required: false })
  @Prop({ required: false, default: new Date() })
  date: Date;

  @ApiProperty({ type: [Set], default: [] })
  @Prop({ type: [SetSchema], default: [] })
  sets: Set[];

  @ApiProperty({ example: '62f1143409793deaec166cad' })
  id: string;

  @ApiProperty({ example: '62f1143409793deaec166cad', type: String })
  @Prop({ type: SchemaTypes.ObjectId, ref: () => User })
  userId: Types.ObjectId;

  @ApiProperty({ example: '62f1143409793deaec166cad', type: String })
  @Prop({ type: SchemaTypes.ObjectId, ref: () => Exercise })
  exerciseId: Types.ObjectId;
}

export const ProgressSchema = SchemaFactory.createForClass(Progress);
