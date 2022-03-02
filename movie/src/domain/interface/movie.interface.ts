import { CreateMovieDto } from '../dto/createMovie.dto';
import { IResponse } from './response.interface';

export interface IMovieService {
  create(movieDto: CreateMovieDto): Promise<IResponse>;
  findAll();
}
