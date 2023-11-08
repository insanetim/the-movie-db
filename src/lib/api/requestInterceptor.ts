import type { InternalAxiosRequestConfig } from 'axios'

import { ACCESS_TOKEN_AUTH } from 'src/constants/app'

const requestInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  config.headers.Accept = 'application/json'
  config.headers.Authorization = `Bearer ${ACCESS_TOKEN_AUTH}`

  return config
}

export default requestInterceptor
