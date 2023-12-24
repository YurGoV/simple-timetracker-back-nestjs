import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  @Length(500, 1500, {
    message: 'Довжина токену має бути від 500 до 1500 символів',
  })
  @ApiProperty({ example: 'token_string..', description: 'token' })
  credential: string;
}
