// Location
export const DEFAULT_LAT = 53.891;
export const DEFAULT_LONG = 27.601;
export const DEFAULT_LOCATION = [DEFAULT_LAT, DEFAULT_LONG];

// Map
export const DEFAULT_ZOOM = 8;

// Api
const localUrl = 'http://localhost:5000';
const herokuUrl = 'https://sporty-brosky.herokuapp.com';
const DOMEN = herokuUrl || localUrl;
const BASE_URL = `${DOMEN}/api/1.0`;

export const API_GET_FIELDS = `${BASE_URL}/fields`;
export const API_CREATE_FIELD = `${BASE_URL}/fields/create`;
export const API_DELETE_FIELD = `${BASE_URL}/fields/delete`;
export const API_USERS_REGISTER = `${BASE_URL}/users/register`;
export const API_USERS_LOGIN = `${BASE_URL}/users/login`;

export const DEFAULT_ERROR = 'Undefined error';
export const LANGUAGE_NAME = 'Language';
export const HTTP_METHODS = {
  DELETE: 'delete',
  GET: 'get',
  PATCH: 'patch',
  POST: 'post',
  PUT: 'put'
};

export const HTTP_STATUSES = {
  NOT_FOUND: 404
};

// Local storage
export const TOKEN_NAME_IN_STORE = 'jwtToken';
export const REFRESH_TOKEN_IN_STORE = 'refreshToken';
export const LANGUAGE_NAME_IN_STORE = 'lang';

// Routes
export const ROUTES = {
  ROOT: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  CREATE_FIELD: '/create-field',
  PROFILE: '/profile',
  PROFILES: '/profiles',
  PLAYERS: '/players',
  USERS: '/users'
};
