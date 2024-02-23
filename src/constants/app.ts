const APP_NAME = 'The Movie DB'
const API_URL = 'https://api.themoviedb.org/3'
const ACCESS_TOKEN_AUTH = process.env.ACCESS_TOKEN_AUTH
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
  ACCESS_TOKEN_AUTH,
  API_URL,
  APP_NAME,
  GENDERS,
  NOTIFICATION_DURATION,
  NOTIFICATION_TYPE,
}
