import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from './configs/mongo.config';
import { RecordsModule } from './records/records.module';
import { ContextsModule } from './contexts/contexts.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getMongoConfig,
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    AuthModule,
    RecordsModule,
    ContextsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
