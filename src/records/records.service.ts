import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Record, RecordDocument } from './record.models/record.model';
import { Model, Schema as mongooseSchema } from 'mongoose';
import { CreateRecordDto, UpdateRecordDto } from './dto/record.dto';

@Injectable()
export class RecordsService {
  constructor(
    @InjectModel(Record.name) private recordModel: Model<RecordDocument>,
  ) {}

  // async createRecord(record: RecordDto, userId: string) {
  async createRecord(record: CreateRecordDto, userId: string) {
    const payload = { ...record, userId };
    const createdRecord = await this.recordModel.create(payload);

    return createdRecord;
  }

  async updateRecord(updateRecordData: UpdateRecordDto) {
    const { record, recordId } = updateRecordData;
    // const payload = { ...record, userId };
    // const createdRecord = await this.recordModel.create(payload);
    const updatedRecord = await this.recordModel.findByIdAndUpdate(
      recordId,
      record,
      { new: true },
    );

    return updatedRecord;
  }

  async deleteRecord(id: string) {
    const deleteOperationResult = await this.recordModel.findByIdAndDelete(id);
    if (!deleteOperationResult) {
      throw new HttpException('id not found', HttpStatus.NOT_FOUND);
    }
    return deleteOperationResult;
  }

  async getAllRecords(userId: mongooseSchema.Types.ObjectId) {
    const allRecords = await this.recordModel.find({ userId });

    return allRecords;
  }

  async getRecordByIs() {}
}
