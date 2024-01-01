import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { SimType } from '../sim-type.enum';
import { HydratedDocument, Schema as mongooseSchema } from 'mongoose';
// import { Roles } from '../roles.enum';
export enum ContextOneValues {
  HEALTH = 'health',
  SOCIAL = 'social',
  FAMILY = 'family',
  WORK = 'work',
}
export enum ContextTwoValues {
  IMPORTANT_URGENT = 'important_urgent',
  IMPORTANT_NOTURGENT = 'important_noturgent',
  UNIMPORTANT_URGENT = 'unimportant_urgent',
  UNIMPORTANT_NOTURGENT = 'unimportant_noturgent',
}

export type RecordDocument = HydratedDocument<Record>;

@Schema({ timestamps: true })
export class Record {
  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: mongooseSchema.Types.ObjectId;

  @Prop({ required: false, default: 0 })
  date: number;

  @Prop({ required: false, default: 0 })
  startTime: number;

  @Prop({ required: false, default: 0 })
  endTime: number;

  @Prop({ required: false, default: [] })
  contextOne: ContextOneValues[];

  @Prop({ required: false, default: [] })
  contextTwo: ContextTwoValues[];

  @Prop({ type: [String], default: [] })
  tags: string[];
}

export const CreateRecordSchema = () => {
  const schema = SchemaFactory.createForClass(Record);
  schema.index({ userId: 1, contextOne: 1 });
  schema.index({ userId: 1, contextTwo: 1 });

  return schema;
};

export const RecordSchema = CreateRecordSchema();

// export const RecordSchema = SchemaFactory.createForClass(Record);
