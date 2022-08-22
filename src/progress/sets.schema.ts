import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type SetDocument = Set & Document;

@Schema({
  toJSON: {
    transform: function (doc: any, ret: any) {
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class Set {
  @ApiProperty({ example: 12 })
  @Prop()
  reps: number;

  @ApiProperty({ example: 6 })
  @Prop()
  usedWeight: number;
}

export const SetSchema = SchemaFactory.createForClass(Set);
