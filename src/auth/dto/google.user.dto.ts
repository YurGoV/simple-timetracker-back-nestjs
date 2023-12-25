// import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GoogleUserDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  given_name: string;

  @IsNotEmpty()
  @IsString()
  picture: string;

  @IsString()
  iss: string;
  @IsString()
  azp: string;
  @IsString()
  sub: string;
  @IsString()
  email_verified: string;
  @IsString()
  nbf: string;
  @IsString()
  locale: string;
  @IsString()
  jat: string;
  @IsString()
  exp: string;
  @IsString()
  jti: string;
}
