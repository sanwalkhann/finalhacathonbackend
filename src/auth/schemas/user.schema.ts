import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({
  timestamps: true,
})
export class User {
  @ApiProperty({ description: 'The name of the user' })
  @Prop()
  name: string;

  @ApiProperty({ description: 'The email of the user' })
  @Prop()
  email: string;

  @ApiProperty({ description: 'The password of the user' })
  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
