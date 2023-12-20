import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (!process.env.NODE_PORT) {
    throw new Error('NODE_PORT is not set in the environment variables.');
  }
  const PORT = process.env.NODE_PORT;

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Swagger example')
    .setDescription('The swagger API description')
    .addBearerAuth()
    .setVersion('1.0')
    .addTag('web-dealer')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(PORT);
}
bootstrap();
