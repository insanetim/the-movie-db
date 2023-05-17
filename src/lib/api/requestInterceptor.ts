import type { InternalAxiosRequestConfig } from 'axios'
import { mergeDeepRight } from 'ramda'

import { ACCESS_TOKEN_AUTH } from 'src/constants/app'

const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig =>
  mergeDeepRight(config, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN_AUTH}`
    }
  })

export default requestInterceptor
