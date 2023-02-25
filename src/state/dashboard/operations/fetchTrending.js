import { createLogic } from 'redux-logic'

import * as endpoints from 'src/constants/endpoints'
import * as types from '../types'
import { fetchTrendingRequest, fetchTrendingSuccess, fetchTrendingError } from '../actions'

const fetchTrending = createLogic({
  type: types.FETCH_TRENDING,
  latest: true,

  async process({ httpClient, action }, dispatch, done) {
    const { page } = action

    dispatch(fetchTrendingRequest())

    try {
      const { data } = await httpClient.get(endpoints.getTrending, { params: { page } })
      dispatch(fetchTrendingSuccess(data))
    } catch (error) {
      dispatch(fetchTrendingError(error))
    }

    done()
  }
})

export default fetchTrending
