import { createLogic } from 'redux-logic'

import * as endpoints from 'src/constants/endpoints'
import * as types from '../types'
import { fetchTrendingRequest, fetchTrendingSuccess, fetchTrendingFailure } from '../actions'

const fetchTrending = createLogic({
  type: types.FETCH_TRENDING,
  latest: true,

  async process({ httpClient, action }, dispatch, done) {
    const page = action.payload

    dispatch(fetchTrendingRequest(page))

    try {
      const { data } = await httpClient.get(endpoints.getTrending, { params: { page } })
      dispatch(fetchTrendingSuccess(data))
    } catch (error) {
      dispatch(fetchTrendingFailure(error))
    }

    done()
  }
})

export default fetchTrending
