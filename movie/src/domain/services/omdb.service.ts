import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

@Injectable()
export class OMDBService {
  private readonly url: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    const apiKey = configService.get('OMDB_API_KEY');
    const baseUrl = configService.get('OMDB_BASE_URL');
    this.url = `${baseUrl}?apiKey=${apiKey}`;
  }
  //Fetch movies

  public async getMovieByTitle(title: string): Promise<any> {
    const url = `${this.url}&t=${title}`;
    try {
      return await this.httpService
        .get(url)
        .pipe(map((response) => response.data));
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
