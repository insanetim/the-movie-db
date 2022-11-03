import * as R from 'ramda'

import { API_KEY } from 'src/constants'

const requestInterceptor = config =>
  R.mergeDeepRight(config, {
    params: {
      api_key: API_KEY
    }
  })

export default requestInterceptor
