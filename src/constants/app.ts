const APP_NAME = 'The Movie DB'
const TMDB_API_URL = process.env.TMDB_API_URL as string
const TMDB_ACCESS_TOKEN_AUTH = process.env.TMDB_ACCESS_TOKEN_AUTH as string
const IMDB_API_URL = process.env.IMDB_API_URL as string
const enum NOTIFICATION_TYPE {
  ERROR = 'error',
  SUCCESS = 'success',
}
const NOTIFICATION_DURATION = 2.5
const GENDERS = [
  'Not set / not specified',
  'Female',
  'Male',
  'Non-binary',
] as const

export {
  APP_NAME,
  GENDERS,
  IMDB_API_URL,
  NOTIFICATION_DURATION,
  NOTIFICATION_TYPE,
  TMDB_ACCESS_TOKEN_AUTH,
  TMDB_API_URL,
}
