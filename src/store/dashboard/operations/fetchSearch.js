import { createLogic } from 'redux-logic'

import * as endpoints from 'src/constants/endpoints'
import * as types from '../types'
import { fetchSearchRequest, fetchSearchSuccess, fetchSearchFailure } from '../actions'

const fetchSearch = createLogic({
  type: types.FETCH_SEARCH,
  latest: true,

  async process({ httpClient, action }, dispatch, done) {
    const { page, query } = action.payload

    dispatch(fetchSearchRequest(page))

    try {
      const { data } = await httpClient.get(endpoints.searchMovies, {
        params: { query, page }
      })
      dispatch(fetchSearchSuccess(data))
    } catch (error) {
      dispatch(fetchSearchFailure(error))
    }

    done()
  }
})

export default fetchSearch
