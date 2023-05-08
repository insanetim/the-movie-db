import type { InternalAxiosRequestConfig } from 'axios'
import { mergeDeepRight } from 'ramda'

import { API_KEY } from 'src/constants/app'

const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig =>
  mergeDeepRight(config, {
    params: {
      api_key: API_KEY
    }
  })

export default requestInterceptor
