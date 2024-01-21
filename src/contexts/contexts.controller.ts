import {
  Body,
  Controller,
  Get,
  Injectable,
  Patch,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ContextService } from './context.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UpdateContextDto } from './dto/update.context.dto';

// import { request } from 'http';

@Injectable()
@Controller('contexts')
export class ContextsController {
  constructor(private readonly contextService: ContextService) {}

  // TODO: change to @User
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @Get()
  async getContexts(@Req() request: any) {
    // console.log(request.user);
    const { userId } = request.user;
    const contexts = this.contextService.getContextsById(userId);
    return contexts;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @Patch()
  //TODO: !!!check by user id to prevent update no user contexts
  // in middlewares
  async updateContext(@Body() payload: UpdateContextDto) {
    // console.log(request.user);
    // const { userId } = request.user;
    const context = this.contextService.updateContext(payload);
    return context;
  }
}