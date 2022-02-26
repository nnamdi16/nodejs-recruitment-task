import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    bodyParser: true,
  });
  app.use(helmet);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const configService = await app.get(ConfigService);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Movie API')
    .setDescription('A simple move API that can create and view list of movies')
    .setVersion('1.0')
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, swaggerConfig, options);
  SwaggerModule.setup('api', app, document);
  const PORT = configService.get('PORT') ?? 3000;
  await app.listen(PORT, () => {
    console.log(`auth svc running at port ${PORT}`);
  });
}
bootstrap();
