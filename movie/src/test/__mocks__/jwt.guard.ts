const mockedJwtAuthGuard = {
  canActivate: jest.fn().mockResolvedValue(true),
};

export default mockedJwtAuthGuard;
