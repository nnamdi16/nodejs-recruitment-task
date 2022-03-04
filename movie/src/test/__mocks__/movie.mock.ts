import MovieEntity from '../../infrastructure/database/PostgresDb/entities/movie.entity';

const mockedMovie: MovieEntity = {
  title: 'Guardians of the Galaxy Vol. 2',
  released: '2017',
  genre: 'Action, Adventure, Comedy',
  director: 'James Gunn',
  userId: '2',
  id: 1,
  isActive: false,
  isArchived: false,
  createdDate: new Date(),
  createdBy: '',
  updatedDate: undefined,
  updatedBy: '',
  Comment: '',
  updateTimestamp: function (): void {
    throw new Error('Function not implemented.');
  },
};

export default mockedMovie;
