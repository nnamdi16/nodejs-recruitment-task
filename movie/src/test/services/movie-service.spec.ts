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
  create: jest.fn((_query) => Promise.resolve(data)),
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

const response = {
  status: 201,
  message: 'Movie successfully created',
  data: {
    title: 'Guardians of the Galaxy Vol. 2',
    released: '2017',
    genre: 'Action, Adventure, Comedy',
    director: 'James Gunn',
  },
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
  describe('Fetch movie by title successfully', () => {
    describe('and the user is matched', () => {
      it('should save movie', async () => {
        const request: CreateMovieDto = {
          title: 'Guardians of the Galaxy Vol. 2',
        };
        const movieResponse = await movieService.create(request);
        console.log(movieResponse);
        expect(movieResponse).toMatchObject(response);
      });
    });
  });
});
