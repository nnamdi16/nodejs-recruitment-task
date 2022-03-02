import { IMovieService } from './../interface/movie.interface';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateMovieDto } from '../dto/createMovie.dto';
import { MovieDto } from '../dto/movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { OMDBService } from './omdb.service';
import { IResponse } from '../interface/response.interface';
import MovieEntity from '../../infrastructure/database/PostgresDb/entities/movie.entity';

@Injectable()
export class MovieService implements IMovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    private readonly omdbService: OMDBService,
  ) {}
  async create(movieDto: CreateMovieDto): Promise<IResponse> {
    try {
      const validationError = await validate(movieDto);
      if (validationError.length > 0) {
        const _errors = { message: 'User input is invalid' };
        throw new HttpException(
          { message: 'Input data validation failed', _errors },
          HttpStatus.BAD_REQUEST,
        );
      }
      const userId = '2';
      const movie = await this.omdbService.getMovieByTitle(movieDto.title);
      const { Title, Released, Genre, Director } = movie;
      const movieData: MovieDto = {
        userId,
        title: Title,
        released: Released,
        genre: Genre,
        director: Director,
      };
      const newUser = this.movieRepository.create(movieData);
      await this.movieRepository.save(newUser);
      return {
        status: HttpStatus.CREATED,
        message: 'Movie successfully created',
        data: movie,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      } else {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
  findAll() {
    throw new Error('Method not implemented.');
  }
}
