import { Test } from '@nestjs/testing';
// import axios from '@test/__mocks__/axios';

import { OMDBService } from '../../domain/services/omdb.service';
import { CreateMovieDto } from '../../domain/dto/createMovie.dto';
import { MovieService } from '../../domain/services/movie.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import MovieEntity from '../../infrastructure/database/PostgresDb/entities/movie.entity';

const omdbServiceApi = {
  getMovieByTitle: jest.fn((_title) => Promise.resolve(data)),
};
const mockedSubTask = {
  create: jest.fn((_title) => Promise.resolve(data)),
  findAllByAuthorisedUser: jest.fn((_userId) => Promise.resolve(movieList)),
  find: jest.fn(({ userId }) => Promise.resolve(movieList)),
  save: jest.fn(() => ({
    metadata: {
      columns: [],
      relations: [],
    },
  })),
};

const data = {
  title: 'Guardians of the Galaxy Vol. 2',
  released: '2017',
  genre: 'Action, Adventure, Comedy',
  director: 'James Gunn',
};
const movieList = [data];
const createMovieResponse = {
  status: 201,
  message: 'Movie successfully created',
  data: {
    title: 'Guardians of the Galaxy Vol. 2',
    released: '2017',
    genre: 'Action, Adventure, Comedy',
    director: 'James Gunn',
  },
};

const movieListResponse = {
  status: 200,
  message: 'Success',
  data: [
    {
      title: 'Guardians of the Galaxy Vol. 2',
      released: '2017',
      genre: 'Action, Adventure, Comedy',
      director: 'James Gunn',
    },
  ],
};
describe('MovieService', () => {
  let movieService: MovieService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: OMDBService,
          useValue: omdbServiceApi,
        },
        MovieService,
        { provide: getRepositoryToken(MovieEntity), useValue: mockedSubTask },
      ],
    }).compile();
    movieService = await module.get<MovieService>(MovieService);

    // reset call counts and called with arguments after each spec
    afterEach(() => jest.clearAllMocks());
  });
  it('should be defined', () => {
    expect(movieService).toBeDefined();
  });
  describe('Create Movie', () => {
    describe('Successfully Create a movie', () => {
      it('should save movie', async () => {
        const request: CreateMovieDto = {
          title: 'Guardians of the Galaxy Vol. 2',
        };
        const movieResponse = await movieService.create(request);
        expect(movieResponse).toMatchObject(createMovieResponse);
      });
    });
  });
  describe('Fetch Movies By Authrised User', () => {
    describe("Successfully fetch all user's movies", () => {
      it('should save movie', async () => {
        const userId = ' 3';
        const movieList = await movieService.findAllByAuthorisedUser(userId);
        expect(movieList).toMatchObject(movieListResponse);
      });
    });
  });
});
