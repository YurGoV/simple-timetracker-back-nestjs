import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
// import { ContextOneValues, ContextTwoValues } from '../record.model/record.model';
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

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 'timestamp number', description: 'day' })
  day: number;

  @IsNumber()
  @ApiProperty({ example: 'timestamp number', description: 'start time' })
  startTime: string;

  @IsNumber()
  @ApiProperty({ example: 'timestamp number', description: 'end time' })
  endTime: string;

  // @IsArray()
  // @IsEnum(LifeSpheres, { each: true })
  // // @IsString({ each: true })
  // // @ApiProperty({ example: ['context', 'another_context'] })
  // @ApiProperty({ enum: LifeSpheres, example: ['context', 'another_context'] })
  // // contextOne: ContextOneValues[];
  // lifeSpheres: LifeSpheres[];
  //
  // @IsArray()
  // // @ValidateNested({ each: true }) // Validate each nested object in the array
  // @IsEnum(Importances, { each: true })
  // // @Type(() => String) //
  // // @ApiProperty({ example: ['tag', 'another_context'] })
  // @ApiProperty({ enum: Importances, example: ['context', 'another_context'] })
  // importances: Importances[];

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

export class CreateRecordDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: 'timestamp number', description: 'day' })
  date: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 'timestamp number', description: 'start time' })
  startTime: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 'timestamp number', description: 'end time' })
  endTime: string;

  @IsOptional()
  @IsString()
  @IsMongoId()
  @ApiProperty({ example: 'valid ObjectId' })
  lifeSphere: string;

  @IsOptional()
  @IsString()
  @IsMongoId()
  @ApiProperty({ example: 'valid ObjectId' })
  importance: string;

  //
  // @IsOptional()
  // @IsArray()
  // @ValidateNested({ each: true }) // Validate each nested object in the array
  // @Type(() => String) //
  // @ApiProperty({ example: ['tag', 'another_context'] })
  // importances: Importances[];
  // @IsArray()
  // @IsEnum(LifeSpheres, { each: true })
  // // @IsString({ each: true })
  // // @ApiProperty({ example: ['context', 'another_context'] })
  // @ApiProperty({ enum: LifeSpheres, example: ['context', 'another_context'] })
  // // contextOne: ContextOneValues[];
  // lifeSpheres: LifeSpheres[];
  //
  // @IsArray()
  // // @ValidateNested({ each: true }) // Validate each nested object in the array
  // @IsEnum(Importances, { each: true })
  // // @Type(() => String) //
  // // @ApiProperty({ example: ['tag', 'another_context'] })
  // @ApiProperty({ enum: Importances, example: ['context', 'another_context'] })
  // importances: Importances[];

  @IsOptional()
  @IsArray()
  @IsMongoId()
  @ApiProperty({ example: ['ObjectId', 'ObjectId'] })
  tags: string[];
}

export class UpdateRecordDto {
  @IsString()
  recordId: string;

  record: CreateRecordDto;
}
