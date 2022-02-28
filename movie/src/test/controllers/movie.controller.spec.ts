import { MovieService } from '@src/domain/services/movie.service';
import { MoviesController } from '@src/app/controllers/movie.controller';
import { Test } from '@nestjs/testing';

describe('MovieController', () => {
  let movieController: MoviesController;
  let movieService: MovieService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [MovieService],
    }).compile();
    movieService = moduleRef.get<MovieService>(MovieService);
    movieController = moduleRef.get<MoviesController>(MoviesController);
  });

  describe('createMovie', () => {
    it('should  return a response object of movie details', async () => {
      const result = {
        title: 'Guardians of the Galaxy Vol. 2',
        released: '2017',
        genre: 'Action, Adventure, Comedy',
        director: 'James Gunn',
      };

      jest.spyOn(movieService, 'createMovie').mockImplementation(() => result);
      expect(await movieController.createMovie()).toBe(result);
    });
  });
});
