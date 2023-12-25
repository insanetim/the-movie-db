const APP_NAME = 'The Movie DB'
const API_URL = 'https://api.themoviedb.org/3'
const ACCESS_TOKEN_AUTH = process.env.ACCESS_TOKEN_AUTH
enum NOTIFICATION_TYPE {
  ERROR = 'error',
  SUCCESS = 'success',
}
const NOTIFICATION_DURATION = 2.5

export {
  ACCESS_TOKEN_AUTH,
  API_URL,
  APP_NAME,
  NOTIFICATION_DURATION,
  NOTIFICATION_TYPE,
}
