import { Test } from '@nestjs/testing';
// import axios from '@test/__mocks__/axios';

import { OMDBService } from '../../domain/services/omdb.service';
import { CreateMovieDto } from '../../domain/dto/createMovie.dto';
import { MovieService } from '../../domain/services/movie.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import MovieEntity from '../../infrastructure/database/PostgresDb/entities/movie.entity';
import { TokenPayload } from '../../domain/interface/tokenPayload.interface';
import { Roles } from '../../domain/interface/role.enum';

const omdbServiceApi = {
  getMovieByTitle: jest.fn((_title) => Promise.resolve(OMDBData)),
};
const mockedSubTask = {
  create: jest.fn((_title) => Promise.resolve(data)),
  findAllMoviesByAuthorisedUser: jest.fn((_userId) =>
    Promise.resolve(movieList),
  ),
  find: jest.fn(({ userId }) => Promise.resolve(movieList)),
  save: jest.fn(() => ({
    metadata: {
      columns: [],
      relations: [],
    },
  })),
};

const OMDBData = {
  Title: 'Guardians of the Galaxy Vol. 2',
  Released: '2017',
  Genre: 'Action, Adventure, Comedy',
  Director: 'James Gunn',
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

export const userDetails: TokenPayload = {
  userId: 123,
  name: 'Basic Thomas',
  role: Roles.BASIC,
  iat: new Date(1606221838),
  exp: new Date(1606221838),
  iss: 'https://www.netguru.com/',
  sub: '123',
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
        const movieResponse = await movieService.create(request, userDetails);
        expect(movieResponse).toMatchObject(createMovieResponse);
      });
    });
  });
  describe('Fetch Movies By Authrised User', () => {
    describe("Successfully fetch all user's movies", () => {
      it('should save movie', async () => {
        const userId = ' 3';
        const movieList = await movieService.findAllMoviesByAuthorisedUser(
          userDetails,
        );
        expect(movieList).toMatchObject(movieListResponse);
      });
    });
  });
});
