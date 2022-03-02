import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { OMDBService } from '../../domain/services/omdb.service';
import axios from '../__mocks__/axios';
import mockedConfigService from '../__mocks__/config.service';
import { HttpException, HttpStatus } from '@nestjs/common';

const data = {
  title: 'Guardians of the Galaxy Vol. 2',
  released: '2017',
  genre: 'Action, Adventure, Comedy',
  director: 'James Gunn',
};
const omdbServiceApi = {
  pipe: jest.fn((data) => data),
  getMovieByTitle: jest.fn((_title) => Promise.resolve(data)),
};
describe('OMDBService', () => {
  let omdbService: OMDBService;
  jest.mock('axios');
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: OMDBService, useValue: omdbServiceApi },
        { provide: ConfigService, useValue: mockedConfigService },
        { provide: HttpService, useValue: mockedAxios },
      ],
    }).compile();
    omdbService = await module.get<OMDBService>(OMDBService);
  });
  it('should be defined', () => {
    expect(omdbService).toBeDefined();
  });

  describe('Get movie by title', () => {
    describe('Fetch movie by title successfully', () => {
      it('should fetch a movie', async (done) => {
        mockedAxios.get.mockImplementationOnce(() => Promise.resolve({ data }));
        const title = 'Guardians of the Galaxy Vol. 2';
        await omdbService.getMovieByTitle(title).then((res) => {
          expect(res).toMatchObject(expect.objectContaining(data));
          done();
        });
      });
    });

    describe('Fetch Movie by title Fails ', () => {
      it('should return empty joke list', async (done) => {
        const error = 'Network Error';
        mockedAxios.get.mockRejectedValueOnce(
          new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              error,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          ),
        );
        await omdbService
          .getMovieByTitle('Guardians of the Galaxy Vol. 2')
          .catch((error) => {
            expect(error.response).toEqual(
              expect.objectContaining({ status: 500 }),
            );
          });

        done();
      });
    });
  });
});
