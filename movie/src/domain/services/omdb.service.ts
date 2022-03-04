import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class OMDBService {
  private readonly url: string;
  constructor(private readonly configService: ConfigService) {
    const apiKey = configService.get('OMDB_API_KEY');
    const baseUrl = configService.get('OMDB_BASE_URL');
    this.url = `${baseUrl}?apiKey=${apiKey}`;
  }
  //Fetch movies

  public async getMovieByTitle(title: string): Promise<any> {
    const url = `${this.url}&t=${title}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
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
