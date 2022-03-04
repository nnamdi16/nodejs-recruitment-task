import MovieEntity from '../../infrastructure/database/PostgresDb/entities/movie.entity';

export const mockedMovieEntity: MovieEntity = {
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

export const mockedMovie = {
  Title: 'Full Metal Jacket',
  Year: '1987',
  Rated: 'R',
  Released: '10 Jul 1987',
  Runtime: '116 min',
  Genre: 'Drama, War',
  Director: 'Stanley Kubrick',
  Writer: 'Stanley Kubrick, Michael Herr, Gustav Hasford',
  Actors: "Matthew Modine, R. Lee Ermey, Vincent D'Onofrio",
  Plot: 'A pragmatic U.S. Marine observes the dehumanizing effects the Vietnam War has on his fellow recruits from their brutal boot camp training to the bloody street fighting in Hue.',
  Language: 'English, Vietnamese',
  Country: 'United Kingdom, United States',
  Awards: 'Nominated for 1 Oscar. 8 wins & 15 nominations total',
  Poster:
    'https://m.media-amazon.com/images/M/MV5BNzkxODk0NjEtYjc4Mi00ZDI0LTgyYjEtYzc1NDkxY2YzYTgyXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  Ratings: [
    {
      Source: 'Internet Movie Database',
      Value: '8.3/10',
    },
    {
      Source: 'Rotten Tomatoes',
      Value: '91%',
    },
    {
      Source: 'Metacritic',
      Value: '76/100',
    },
  ],
  Metascore: '76',
  imdbRating: '8.3',
  imdbVotes: '716,738',
  imdbID: 'tt0093058',
  Type: 'movie',
  DVD: '12 Jun 2001',
  BoxOffice: '$46,357,676',
  Production: 'N/A',
  Website: 'N/A',
  Response: 'True',
};
