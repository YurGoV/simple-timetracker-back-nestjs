import {
  Body,
  Controller,
  Get,
  Injectable,
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
import { CreateRecordDto, RecordDto } from './dto/record.dto';

@Injectable()
@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

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
