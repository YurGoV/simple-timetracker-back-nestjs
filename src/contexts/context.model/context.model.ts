import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as mongooseSchema } from 'mongoose';
import { ContextsTypes } from 'src/configs/userConstants';

export type ContextDocument = HydratedDocument<Context>;

@Schema({ timestamps: true })
export class Context {
  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'Context', required: true })
  userId: mongooseSchema.Types.ObjectId;

  @Prop({ required: true, enum: Object.values(ContextsTypes) })
  type: ContextsTypes;

  @Prop({ required: true, type: String })
  value: string;
}

export const CreateContextSchema = () => {
  const schema = SchemaFactory.createForClass(Context);
  schema.index({ userId: 1, lifeSpheres: 1 });
  schema.index({ userId: 1, importances: 1 });
  schema.index({ userId: 1, tags: 1 });

  return schema;
};

export const ContextSchema = CreateContextSchema();
