import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MoviesController } from '../controllers/movie.controller';
import { OMDBService } from '../../domain/services/omdb.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import MovieEntity from '../../infrastructure/database/PostgresDb/entities/movie.entity';
import { MovieService } from '../../domain/services/movie.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../middlewares/guards/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([MovieEntity]),
    PassportModule,
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}`,
        },
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({ defaultStrategy: 'bearer' }),
  ],
  controllers: [MoviesController],
  providers: [OMDBService, MovieService, JwtStrategy],
  exports: [OMDBService, MovieService, JwtStrategy],
})
export class MovieModule {}
