import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Injectable,
  Param,
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
import { CreateRecordDto, UpdateRecordDto } from './dto/record.dto';
import { IdParamDto } from 'src/common/dto/id.param.dto';

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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  // @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  // TODO: update to 'update/{id}'
  @Patch('update')
  async updateRecord(@Body() updateRecordData: UpdateRecordDto) {
    // const { userId } = request!.user;
    // const { record, recordId } = updateRecordData
    const updatedRecord =
      await this.recordsService.updateRecord(updateRecordData);

    return updatedRecord;
  }

  @HttpCode(204)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @Delete(':id')
  async deleteRecord(@Param() params: IdParamDto) {
    const { id } = params;
    await this.recordsService.deleteRecord(id);
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
