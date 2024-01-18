import { Module } from '@nestjs/common';
import { ContextsController } from './contexts.controller';
import { MongooseModule } from '@nestjs/mongoose';
// import { Record, RecordSchema } from './record.models/record.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from 'src/configs/jwt.config';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthModule } from 'src/auth/auth.module';
import { User, UserSchema } from 'src/auth/auth.model/user.model';
// import { RecordsService } from './records.service';
import { Context, ContextSchema } from './context.model/context.model';
import { ContextService } from './context.service';

@Module({
  controllers: [ContextsController],
  providers: [ContextService, JwtAuthGuard],
  imports: [
    MongooseModule.forFeature([
      // {
      //   name: Record.name,
      //   schema: RecordSchema,
      // },
      {
        name: Context.name,
        schema: ContextSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getJwtConfig, // Assuming you have a getJwtConfig function
      inject: [ConfigService],
    }),
  ],
})
export class ContextsModule {}
