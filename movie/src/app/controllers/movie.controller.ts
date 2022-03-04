import { JwtAuthGuard } from './../middlewares/guards/jwt.guard';
import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MovieService } from '../../domain/services/movie.service';
import { CreateMovieDto } from '../../domain/dto/createMovie.dto';

@Controller('movie')
@ApiTags('movie')
export class MoviesController {
  constructor(private readonly movieService: MovieService) {}
  @Get('create/:title')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public async createMovie(
    @Param('title') title: string,
    @Req() req,
  ): Promise<any> {
    const movieDto: CreateMovieDto = {
      title,
    };
    return await this.movieService.create(movieDto, req?.user);
  }

  @Get('/movies')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  public async fetchMovies(@Req() req): Promise<any> {
    return await this.movieService.findAllMoviesByAuthorisedUser(req.user);
  }
}
