import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

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
export class User {
  @ApiProperty({ example: 'John Doe' })
  @Prop()
  name: string;

  @ApiProperty({ example: 'john.doe@gmail.com' })
  @Prop()
  email: string;

  @Prop({ select: false })
  password: string;

  @ApiProperty({ example: '62f1143409793deaec166cad' })
  id: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
