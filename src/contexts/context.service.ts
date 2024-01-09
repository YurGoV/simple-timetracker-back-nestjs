import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { C, RecordDocument } from './record.models/record.model';
import { Model, Schema as mongooseSchema } from 'mongoose';
import { Context, ContextDocument } from './context.model/context.model';

// import { CreateRecordDto, RecordDto } from './dto/record.dto';

@Injectable()
export class ContextService {
  constructor(
    @InjectModel(Context.name) private contextModel: Model<ContextDocument>,
  ) {}

  async getContextsById(userId: mongooseSchema.Types.ObjectId) {
    const response = await this.contextModel.find({ userId });
    return response;
  }

  // async createRecord(record: RecordDto, userId: string) {
  // async createContext(record: CreateContextDto, userId: string) {
  //   const payload = { ...record, userId };
  //   const createdRecord = await this.recordModel.create(payload);
  //
  //   return createdRecord;
  // }

  // async getRecords() {}
}
