const BASE_PATHS = {
  AUTH: '/auth',
} as const;

const ROUTES_PATHS = {
  HOME: '/',

  // Auth
  AUTH: {
    ROOT: BASE_PATHS.AUTH,
    LOGIN: '/login',
  },

  // Error
  NOT_FOUND: '*',
};

export { BASE_PATHS, ROUTES_PATHS };
