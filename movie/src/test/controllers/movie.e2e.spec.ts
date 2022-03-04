import { userDetails } from './../services/movie-service.spec';
import { JwtAuthGuard } from './../../app/middlewares/guards/jwt.guard';
import {
  ExecutionContext,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from '../../domain/services/movie.service';
import { OMDBService } from '../../domain/services/omdb.service';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import MovieEntity from '../../infrastructure/database/PostgresDb/entities/movie.entity';
import mockedMovie from '../__mocks__/movie.mock';
import { MoviesController } from '../../app/controllers/movie.controller';
import mockedConfigService from '../__mocks__/config.service';
import mockedJwtService from '../__mocks__/jwt.service';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '../../app/middlewares/guards/jwt.strategy';
import mockedUser from '../__mocks__/user.mock';
import { AppModule } from '../../app.module';

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibmFtZSI6IkJhc2ljIFRob21hcyIsInJvbGUiOiJiYXNpYyIsImlhdCI6MTY0NjMxNTEzMCwiZXhwIjoxNjQ2MzE2OTMwLCJpc3MiOiJodHRwczovL3d3dy5uZXRndXJ1LmNvbS8iLCJzdWIiOiIxMjMifQ.XoaUmYka6dNuUABfao-_VOamiENBD0P3jAQhVSpYct4`;
describe('MovieController (e2e)', () => {
  let app: INestApplication;
  let movieData: MovieEntity;

  beforeEach(async () => {
    movieData = {
      ...mockedMovie,
      updateTimestamp: () => jest.fn(() => new Date()),
    };
    const movieRepository = {
      create: jest.fn().mockResolvedValue(movieData),
      save: jest.fn().mockReturnValue(Promise.resolve()),
      find: jest.fn().mockReturnValue(Promise.resolve([movieData])),
    };

    const module = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [MoviesController],
      providers: [
        OMDBService,
        JwtStrategy,
        {
          provide: JwtStrategy,
          useValue: {
            validate: jest.fn().mockResolvedValue(mockedUser),
            jwtFromRequest: jest.fn().mockReturnValue(token),
          },
        },
        MovieService,
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: JwtAuthGuard,
          useValue: {
            canActivate: jest.fn().mockResolvedValue(userDetails),
          },
        },
        {
          provide: getRepositoryToken(MovieEntity),
          useValue: movieRepository,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const req = context.switchToHttp().getRequest();
          req.user = userDetails; // Your user object
          return true;
        },
      })
      .compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });
  describe('Create Movie Endpoint', () => {
    it('should POST - Create a movie', async () => {
      const data = {
        status: 201,
        message: 'Movie successfully created',
        data: {},
      };
      await request(app.getHttpServer())
        .get('/movie/create/Shame')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect(data);
    });
  });

  describe('Fetch Movies', () => {
    it('should GET- List of movies', async () => {
      const result = await request(app.getHttpServer())
        .get('/movie/movies')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(result.status).toEqual(200);
    });
  });
});

describe('Authorization', () => {
  let guard: JwtAuthGuard;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        JwtAuthGuard,
        JwtStrategy,
        {
          provide: JwtStrategy,
          useValue: {
            validate: jest.fn().mockResolvedValue(mockedUser),
          },
        },
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
      ],
    }).compile();

    guard = module.get<JwtAuthGuard>(JwtAuthGuard);
  });
  it('should throw UnauthorizedException when token is not Bearer', async (done) => {
    const context = {
      getClass: jest.fn(),
      getHandler: jest.fn(),
      switchToHttp: jest.fn(() => ({
        getRequest: jest.fn().mockReturnValue({
          headers: {
            authorization: `Bearer ${token}`,
          },
        }),
      })),
    } as any;

    await expect(guard.canActivate(context)).toBe(true);
    expect(context.switchToHttp).toHaveBeenCalled();
    done();
  });
});
