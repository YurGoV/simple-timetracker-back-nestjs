import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GoogleAuthDto } from './dto/google.auth.dto';
import { AuthService } from './auth.service';
import { GoogleUserDto } from './dto/google.user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt.guard';
import { UserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() { credential }: GoogleAuthDto) {
    const googleUser: GoogleUserDto = await this.authService.getGoogleUser({
      credential,
    });
    const dbUser: UserDto | null = await this.authService.getDbUserByEmail(
      googleUser.email,
    );
    if (dbUser && !dbUser.token) {
      const { email } = dbUser;
      const token = await this.authService.createJWT(email);
      const user = await this.authService.updateToken(email, token);
      return user;
    }

    if (!dbUser) {
      const { email } = googleUser;
      const token = await this.authService.createJWT(email);
      const user = await this.authService.createUser(googleUser, token);
      return user;
    }

    return dbUser;
  }

  @HttpCode(200)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('current')
  async current(@Req() request: any) {
    const email = request.user?.email;
    const user: UserDto | null = await this.authService.getDbUserByEmail(email);

    if (!user) {
      throw new HttpException('помилка авторизації', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
