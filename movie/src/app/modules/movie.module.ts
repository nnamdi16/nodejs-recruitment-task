import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MoviesController } from '../controllers/movie.controller';
import { OMDBService } from '../../domain/services/omdb.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import MovieEntity from '../../infrastructure/database/PostgresDb/entities/movie.entity';
import { MovieService } from '../../domain/services/movie.service';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity]), ConfigModule, HttpModule],
  controllers: [MoviesController],
  providers: [OMDBService, MovieService],
  exports: [OMDBService],
})
export class MovieModule {}
