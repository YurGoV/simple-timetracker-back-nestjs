import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateContextDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'exercises', description: 'context value (name)' })
  value: string;
}

export interface ICreateContextPayload {
  value: string;
}
