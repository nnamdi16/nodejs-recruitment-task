const mockedConfigService = {
  get(key: string) {
    switch (key) {
      case 'OMDB_API_KEY':
        return '3600';
      case 'OMDB_BASE_URL':
        return 'http://www.omdbapi.com';
    }
  },
};

export default mockedConfigService;
