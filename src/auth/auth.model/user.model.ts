import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { SimType } from '../sim-type.enum';
import { HydratedDocument, Schema as mongooseSchema } from 'mongoose';
// import { Roles } from '../roles.enum';
export enum Roles {
  USER = 'user',
  ADMIN = 'admin',
}

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: false, default: '' })
  name: string;

  @Prop({ required: false, default: '' })
  given_name: string;

  @Prop({ required: false, default: '' })
  picture: string;

  @Prop({ enum: Roles, default: 'user' })
  role: Roles;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ required: false, default: '' })
  token: string;
}

export const CreateUserSchema = () => {
  const schema = SchemaFactory.createForClass(User);
  schema.index({ tags: 1, email: 1 });

  return schema;
};

export const UserSchema = CreateUserSchema();
