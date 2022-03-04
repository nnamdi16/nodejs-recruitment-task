import { CreateMovieDto } from '../dto/createMovie.dto';
import { IResponse } from './response.interface';
import { TokenPayload } from './tokenPayload.interface';

export interface IMovieService {
  create(
    movieDto: CreateMovieDto,
    userDetail: TokenPayload,
  ): Promise<IResponse>;
  findAllMoviesByAuthorisedUser(userDetails: TokenPayload): Promise<IResponse>;
}
