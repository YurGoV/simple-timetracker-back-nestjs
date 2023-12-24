import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { verifyGoogleCredentials } from './auth.utils';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './auth.model/user.model';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private testModel: Model<UserDocument>) {}
  async getGoogleUser({ credential }: AuthDto) {
    try {
      // console.log(credential, 'cr in service');
      const googleUser = await verifyGoogleCredentials(credential);
      // const { email, name, given_name, picture } = googleUser;
      // console.log(googleUser, 'googleUser');
      return googleUser;
    } catch {
      throw new HttpException(
        'помилка гугл-авторизації',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async getDbUserByEmail(email: string) {
    const dbUser = await this.testModel.findOne({ email });
    return dbUser;
  }

  async createUser(googleUser: CreateUserDto) {
    const { email, name, given_name, picture } = googleUser;
    const user = await this.testModel.create({
      email,
      name,
      given_name,
      picture,
    });
    return user;
  }
}
