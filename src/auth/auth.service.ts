import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GoogleAuthDto } from './dto/google.auth.dto';
import { verifyGoogleCredentials } from './auth.utils';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './auth.model/user.model';
import { Model } from 'mongoose';
import { GoogleUserDto } from './dto/google.user.dto';
import { UserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}
  async getGoogleUser({ credential }: GoogleAuthDto) {
    try {
      const googleUser: GoogleUserDto = await verifyGoogleCredentials(credential);
      return googleUser;
    } catch {
      throw new HttpException(
        'помилка гугл-авторизації',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async getDbUserByEmail(email: string): Promise<UserDto | null> {
    const dbUser: UserDto | null = await this.userModel.findOne({ email });
    return dbUser;
  }

  async createUser(googleUser: GoogleUserDto, token: string) {
    const { email, name, given_name, picture } = googleUser;
    const user = await this.userModel.create({
      email,
      name,
      given_name,
      picture,
      token,
    });
    return user;
  }

  async updateToken(email: string, token: string) {
    const user = await this.userModel.findOneAndUpdate(
      { email },
      {
        token,
      },
      { new: true },
    );
    return user;
  }

  async createJWT(email: string) {
    const payload = { email };
    const token: string = await this.jwtService.signAsync(payload);
    return token;
  }
}
