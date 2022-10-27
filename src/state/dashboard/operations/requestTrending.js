import { createLogic } from 'redux-logic'

import * as endpoints from 'src/constants/endpoints'
import { setTrending } from '../actions'
import * as types from '../types'

const requestTrending = createLogic({
  type: types.REQUEST_TRENDING,
  latest: true,
  async process({ httpClient, action: { payload: page = 1 } }, dispatch, done) {
    const { data } = await httpClient.get(endpoints.getTrending, {
      params: {
        page
      }
    })
    dispatch(setTrending(data))
    done()
  }
})

export default requestTrending
