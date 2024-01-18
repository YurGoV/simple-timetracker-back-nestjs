import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/auth/auth.model/user.model';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new HttpException('no token', HttpStatus.BAD_REQUEST);
    }

    let decodedToken: any | null = null;
    try {
      decodedToken = await this.jwtService.verifyAsync(token);
    } catch (error: any) {
      if (error?.message === 'jwt expired') {
        throw new HttpException('jwt expired', HttpStatus.NOT_ACCEPTABLE);
      }
      return false; // Invalid token or error in token verification
    }

    if (!decodedToken) {
      throw new HttpException('verification failed', HttpStatus.BAD_REQUEST);
    }

    const user = decodedToken;
    const { email } = user;
    if (!email) {
      throw new HttpException(
        'there no valid payload in jwt',
        HttpStatus.BAD_REQUEST,
      );
    }
    const userFromDb = await this.userModel.findOne({ email });

    if (!userFromDb) {
      throw new HttpException('there no such user', HttpStatus.NOT_FOUND);
    }
    if (!userFromDb?.token) {
      throw new HttpException(
        'будь ласка залогіньтесь',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const { role, _id: userId } = userFromDb;

    request.user = { ...user, role, userId };

    return true; // Token is valid and not expired
  }
}
