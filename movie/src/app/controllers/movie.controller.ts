import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MovieService } from '../../domain/services/movie.service';
import { CreateMovieDto } from '../../domain/dto/createMovie.dto';

@Controller('movie')
@ApiTags('movie')
export class MoviesController {
  constructor(private readonly movieService: MovieService) {}
  @Get('create/:title')
  public async post(@Param('title') title: string): Promise<any> {
    const movieDto: CreateMovieDto = {
      title,
    };
    return await this.movieService.create(movieDto);
  }
}
