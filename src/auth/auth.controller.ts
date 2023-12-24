import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
// import { ApiBody, ApiParam } from '@nestjs/swagger';
import { AuthService } from './auth.service';
// import { User, UserDocument } from './auth.model/user.model';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create.user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    // @InjectModel(User.name) private testModel: Model<UserDocument>,
    private readonly authService: AuthService,
  ) {}

  @HttpCode(200)
  @Post('login')
  async login(@Body() { credential }: AuthDto) {
    // async getGoogleUser(@Body() dto: AuthDto) {
    // const { credential } = dto;
    // console.log(credential);
    const googleUser: CreateUserDto = await this.authService.getGoogleUser({
      credential,
    });
    const dbUser = await this.authService.getDbUserByEmail(googleUser.email);

    if (!dbUser) {
      const user = await this.authService.createUser(googleUser);
      return user;
    }
  }

  @Get('current')
  async current() {}
}
