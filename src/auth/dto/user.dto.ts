import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsJWT, IsNotEmpty, IsString, Length } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @Length(500, 1500)
  @ApiProperty({ example: 'record_id', description: 'id' })
  _id: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'email@email.com', description: 'email' })
  email: string;

  @IsString()
  @ApiProperty({ example: 'YurGo', description: 'name' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'YurGo', description: 'name' })
  given_name: string;

  @IsString()
  @ApiProperty({ example: 'https://......', description: 'picture url' })
  picture: string;

  @IsJWT()
  @ApiProperty({ example: '.....', description: 'token' })
  token: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({
    example: '2023-12-24T15:30:51.864+00:00',
    description: 'updated date',
  })
  createdAt: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty({
    example: '2023-12-24T15:30:51.864+00:00',
    description: 'updated date',
  })
  updatedAt: string;
}
