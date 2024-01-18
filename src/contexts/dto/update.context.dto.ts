import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateContextDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'record_id', description: 'id' })
  id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'exercises', description: 'context value (name)' })
  value: string;
}
