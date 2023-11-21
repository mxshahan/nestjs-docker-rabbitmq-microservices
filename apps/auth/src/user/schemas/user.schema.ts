import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '@app/common';

@Schema({ versionKey: false })
export class User extends AbstractDocument {
  @Prop({ unique: true })
  auth0uid: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
