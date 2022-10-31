import { merge } from 'lodash'

import { API_KEY } from 'src/constants'

const requestInterceptor = config =>
  merge(config, {
    params: {
      api_key: API_KEY
    }
  })

export default requestInterceptor
