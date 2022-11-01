import { createLogic } from 'redux-logic'

import * as endpoints from 'src/constants/endpoints'
import * as types from '../types'
import { setTrending } from '../actions'

const fetchTrending = createLogic({
  type: types.FETCH_TRENDING,
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

export default fetchTrending
