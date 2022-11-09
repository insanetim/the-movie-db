import { createLogic } from 'redux-logic'

import * as endpoints from 'src/constants/endpoints'
import { showNotification } from 'src/state/app/actions'
import * as types from '../types'
import { setSearch, setSearchQuery } from '../actions'

const fetchSearch = createLogic({
  type: types.FETCH_SEARCH,
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
    try {
      const { data } = await httpClient.get(endpoints.searchMovies, {
        params: { query, page }
      })
      dispatch(setSearch(data))
      dispatch(setSearchQuery(query))
    } catch (error) {
      dispatch(showNotification({ type: 'error', message: error.message }))
    }
    done()
  }
})

export default fetchSearch
