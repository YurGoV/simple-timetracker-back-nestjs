import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ContextOneValues, ContextTwoValues } from '../record.model/record.model';
import { Type } from 'class-transformer';

export class RecordDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'record_id', description: 'id' })
  _id: string;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ example: '...', description: 'user owner record id' })
  userId: string;

  @IsNumber()
  @ApiProperty({ example: 'timestamp number', description: 'day' })
  day: number;

  @IsNumber()
  @ApiProperty({ example: 'timestamp number', description: 'start time' })
  startTime: string;

  @IsNumber()
  @ApiProperty({ example: 'timestamp number', description: 'end time' })
  endTime: string;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ example: ['context', 'another_context'] })
  // contextOne: ContextOneValues[];
  contextOne: ContextOneValues[];

  @IsArray()
  @ValidateNested({ each: true }) // Validate each nested object in the array
  @Type(() => String) //
  @ApiProperty({ example: ['tag', 'another_context'] })
  contextTwo: ContextTwoValues[];

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ example: ['context', 'another_context'] })
  // contextOne: ContextOneValues[];
  tags: string[];

  @IsDate()
  @ApiProperty({
    example: '2023-12-24T15:30:51.864+00:00',
    description: 'created date',
  })
  createdAt: string;

  @IsDate()
  @ApiProperty({
    example: '2023-12-24T15:30:51.864+00:00',
    description: 'updated date',
  })
  updatedAt: string;
}

export type CreateRecordDto = Omit<
  RecordDto,
  '_id' | 'userId' | 'createdAt' | 'updatedAt'
>;
