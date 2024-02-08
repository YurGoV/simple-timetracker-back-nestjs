import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { SimType } from '../sim-type.enum';
import { HydratedDocument, Schema as mongooseSchema } from 'mongoose';
// import { Importances, LifeSpheres } from 'src/auth/auth.model/user.model';
// import { Roles } from '../roles.enum';

export type RecordDocument = HydratedDocument<Record>;

@Schema({ timestamps: true })
export class Record {
  @Prop({ type: mongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: mongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  date: number;

  @Prop({ required: false, default: 0 })
  startTime: number;

  @Prop({ required: false, default: 0 })
  endTime: number;

  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: 'Context',
    required: true,
    // default: '',
  })
  lifeSphere: mongooseSchema.Types.ObjectId | string;

  @Prop({
    type: mongooseSchema.Types.ObjectId,
    ref: 'Context',
    required: true,
    // default: '',
  })
  importance: mongooseSchema.Types.ObjectId;

  @Prop({
    // type: mongooseSchema.Types.ObjectId,
    type: [mongooseSchema.Types.ObjectId],
    ref: 'Context',
    required: false,
    default: [],
  })
  tags: mongooseSchema.Types.ObjectId[];

  @Prop({ required: false, default: '' })
  comment: string;
}

export const CreateRecordSchema = () => {
  const schema = SchemaFactory.createForClass(Record);
  schema.index({ userId: 1, lifeSphere: 1 });
  schema.index({ userId: 1, importance: 1 });
  schema.index({ userId: 1, tags: 1 });

  return schema;
};

export const RecordSchema = CreateRecordSchema();
