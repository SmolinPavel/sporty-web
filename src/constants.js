// Location
export const DEFAULT_LAT = 53.891;
export const DEFAULT_LONG = 27.601;
export const DEFAULT_LOCATION = [DEFAULT_LAT, DEFAULT_LONG];

// Zoom
export const DEFAULT_ZOOM = 8;

const localUrl = 'http://localhost:5000';
const herokuUrl = 'https://sporty-brosky.herokuapp.com';
const DOMEN = herokuUrl;

// Api
export const API_GET_FIELDS = 'https://sporty-brosky.herokuapp.com/api/1.0/fields';
export const API_USERS_REGISTER = `${DOMEN}/api/1.0/users/register`;
export const API_USERS_LOGIN = 'https://sporty-brosky.herokuapp.com/api/1.0/users/login';
