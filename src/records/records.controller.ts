import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { RecordsService } from './records.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Record } from './record.model/record.model';
import { CreateRecordDto, RecordDto } from './dto/record.dto';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('create')
  async createRecord(@Body() record: CreateRecordDto, @Req() request: any) {
    const { userId } = request!.user;
    const createdRecord = await this.recordsService.createRecord(
      record,
      userId,
    );

    return createdRecord;
  }
}
