import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GoogleAuthDto } from './dto/google.auth.dto';
import { verifyGoogleCredentials } from './auth.utils';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './auth.model/user.model';
import { Model } from 'mongoose';
import { GoogleUserDto } from './dto/google.user.dto';
import { UserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import {
  Importances,
  importances,
  initialUserTags,
  LifeSpheres,
  lifeSpheres,
} from 'src/configs/userConstants';
import {
  Context,
  ContextDocument,
} from 'src/contexts/context.model/context.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Context.name) private contextModel: Model<ContextDocument>,
    private readonly jwtService: JwtService,
  ) {}
  async getGoogleUser({ credential }: GoogleAuthDto) {
    try {
      const googleUser: GoogleUserDto =
        await verifyGoogleCredentials(credential);
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
    const payload = {
      email,
      name,
      given_name,
      picture,
      token,
      lifeSpheres,
      importances,
      tags: initialUserTags,
    };
    const user = await this.userModel.create(payload);

    // TODO: move to configs
    const lifeSpheresContextSetups = [
      { userId: user._id, type: 'life', value: LifeSpheres.HEALTH },
      { userId: user._id, type: 'life', value: LifeSpheres.WORK },
      { userId: user._id, type: 'life', value: LifeSpheres.FAMILY },
      { userId: user._id, type: 'life', value: LifeSpheres.SOCIAL },
      {
        userId: user._id,
        type: 'importance',
        value: Importances.IMPORTANT_URGENT,
      },
      {
        userId: user._id,
        type: 'importance',
        value: Importances.UNIMPORTANT_URGENT,
      },
      {
        userId: user._id,
        type: 'importance',
        value: Importances.IMPORTANT_NOTURGENT,
      },
      {
        userId: user._id,
        type: 'importance',
        value: Importances.UNIMPORTANT_NOTURGENT,
      },
      //
      { userId: user._id, type: 'tag', value: 'coding' },
      { userId: user._id, type: 'tag', value: 'walking' },
      { userId: user._id, type: 'tag', value: 'meeting' },
      { userId: user._id, type: 'tag', value: 'dance' },
      { userId: user._id, type: 'tag', value: 'learn' },
      { userId: user._id, type: 'tag', value: 'training' },
      { userId: user._id, type: 'tag', value: 'pet' },
      { userId: user._id, type: 'tag', value: 'video' },
      { userId: user._id, type: 'tag', value: 'fiction' },
      { userId: user._id, type: 'tag', value: 'physical' },
      { userId: user._id, type: 'tag', value: 'hobby' },
      { userId: user._id, type: 'tag', value: 'it' },
      { userId: user._id, type: 'tag', value: 'js' },
      { userId: user._id, type: 'tag', value: 'ts' },
      { userId: user._id, type: 'tag', value: 'node' },
      { userId: user._id, type: 'tag', value: 'vue' },
    ];

    await this.contextModel.insertMany(lifeSpheresContextSetups);

    // console.log(lifeSpheresContextSetup1);

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

  async deleteToken(email: string) {
    const user = await this.userModel.findOneAndUpdate(
      { email },
      {
        token: '',
      },
      { new: true },
    );
    if (!user || (user && user.token)) {
      throw new HttpException(
        'logout service error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createJWT(email: string) {
    const payload = { email };
    const token: string = await this.jwtService.signAsync(payload);
    return token;
  }
}
