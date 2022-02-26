import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as Joi from 'joi';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HEROKU_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_HEROKU_USER: Joi.string().required(),
        POSTGRES_HEROKU_PASSWORD: Joi.string().required(),
        POSTGRES_HEROKU_DB: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
