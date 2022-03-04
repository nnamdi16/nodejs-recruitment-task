import { IMovieService } from './../interface/movie.interface';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateMovieDto } from '../dto/createMovie.dto';
import { MovieDto } from '../dto/movie.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { validate } from 'class-validator';
import { OMDBService } from './omdb.service';
import { IResponse } from '../interface/response.interface';
import MovieEntity from '../../infrastructure/database/PostgresDb/entities/movie.entity';
import { TokenPayload } from '../interface/tokenPayload.interface';
import { Roles } from '../interface/role.enum';

@Injectable()
export class MovieService implements IMovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    private readonly omdbService: OMDBService,
  ) {}
  async findAllMoviesByAuthorisedUser(
    userDetails: TokenPayload,
  ): Promise<IResponse> {
    const { userId } = userDetails;
    const movies = await this.movieRepository.find({
      userId: userId.toString(),
    });
    return {
      status: HttpStatus.OK,
      message: 'Success',
      data: movies,
    };
  }
  async create(
    movieDto: CreateMovieDto,
    userDetails: TokenPayload,
  ): Promise<IResponse> {
    try {
      const validationError = await validate(movieDto);
      if (validationError.length > 0) {
        const _errors = { message: 'User input is invalid' };
        throw new HttpException(
          { message: 'Input data validation failed', _errors },
          HttpStatus.BAD_REQUEST,
        );
      }
      const { userId } = userDetails;
      await this.checkMovieLimit(userDetails);
      const movie = await this.omdbService.getMovieByTitle(movieDto.title);
      const { Title, Released, Genre, Director } = movie;
      const movieData: MovieDto = {
        userId: userId.toString(),
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

  async checkMovieLimit(userDetails: TokenPayload) {
    const { userId, role } = userDetails;
    if (role === Roles.BASIC) {
      const endDate = new Date();
      const startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
      const existingMovieList: MovieDto[] = await this.movieRepository.find({
        where: {
          createdDate: Between(startDate.toISOString(), endDate.toISOString()),
          userId: userId.toString(),
        },
      });
      if (existingMovieList.length === 5) {
        throw new HttpException(
          { message: 'Exceeded limit to create movie per month' },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
