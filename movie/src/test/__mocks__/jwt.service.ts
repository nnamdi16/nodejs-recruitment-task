import { userDetails } from '../services/movie-service.spec';

const mockedJwtService = {
  sign: () => '',
  decode: jest.fn().mockResolvedValue(userDetails),
};

export default mockedJwtService;
