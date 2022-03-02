import { HttpModule, HttpService } from '@nestjs/axios';
import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { MovieService } from '../../domain/services/movie.service';
import { OMDBService } from '../../domain/services/omdb.service';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import * as request from 'supertest';

describe('MovieController (e2e)', () => {
  let app: INestApplication;
  let httpService: HttpService;

  beforeAll(async () => {
    const mockAppModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule, HttpModule, ConfigModule],
      providers: [OMDBService, MovieService],
    }).compile();

    app = mockAppModule.createNestApplication();
    httpService = mockAppModule.get<HttpService>(HttpService);
    await app.init();
  });

  it('should POST - Create a movie', async () => {
    const data: AxiosResponse<any> = {
      config: {},
      data: {
        title: 'Guardians of the Galaxy Vol. 2',
        released: '2017',
        genre: 'Action, Adventure, Comedy',
        director: 'James Gunn',
      },
      status: 200,
      headers: {},
      statusText: 'OK',
    };
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(data));
    const response = await request(app.getHttpServer())
      .post('/movie/create/:title')
      .expect(200);
    expect(response.body).toEqual(data);
  });
});
