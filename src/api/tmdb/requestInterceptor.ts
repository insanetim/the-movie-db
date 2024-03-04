import { InternalAxiosRequestConfig } from 'axios'
import { TMDB_ACCESS_TOKEN_AUTH } from 'src/constants/app'

const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  config.headers.Accept = 'application/json'
  config.headers.Authorization = `Bearer ${TMDB_ACCESS_TOKEN_AUTH}`

  return config
}

export default requestInterceptor
