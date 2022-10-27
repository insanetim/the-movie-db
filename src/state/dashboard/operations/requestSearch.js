import { createLogic } from 'redux-logic'

import * as endpoints from 'src/constants/endpoints'
import { setSearch, setSearchQuery } from '../actions'
import * as types from '../types'

const requestSearch = createLogic({
  type: types.REQUEST_SEARCH,
  latest: true,
  async process(
    {
      httpClient,
      action: {
        payload: { query, page = 1 }
      }
    },
    dispatch,
    done
  ) {
    const { data } = await httpClient.get(endpoints.searchMovies, {
      params: { query, page }
    })
    dispatch(setSearch(data))
    dispatch(setSearchQuery(query))
    done()
  }
})

export default requestSearch
