import {
  Body,
  Controller,
  Get,
  Injectable,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RecordsService } from './records.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Record } from './record.models/record.model';
import { CreateRecordDto, RecordDto, UpdateRecordDto } from './dto/record.dto';

@Injectable()
@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) { }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  // @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @Post('create')
  async createRecord(@Body() record: CreateRecordDto, @Req() request: any) {
    const { userId } = request!.user;
    const createdRecord = await this.recordsService.createRecord(
      record,
      userId,
    );

    return createdRecord;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  // @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @Patch('update')
  // async updateRecord(@Body() updateRecordData: UpdateRecordDto, @Req() request: any) {
  async updateRecord(@Body() updateRecordData: UpdateRecordDto) {
    // const { userId } = request!.user;
    // const { record, recordId } = updateRecordData
    const updatedRecord = await this.recordsService.updateRecord(
      updateRecordData
    );

    return updatedRecord;
  }


  // TODO: change to @User
  //TODO: add validation
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  // @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @Get()
  // const { userId } = request.user;
  async getAllRerords(@Req() request: any) {
    const { userId } = request!.user;
    const allRecords = await this.recordsService.getAllRecords(userId);

    return allRecords;
  }
}
