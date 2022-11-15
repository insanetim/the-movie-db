import { createLogic } from 'redux-logic'
import { or, path, pathOr } from 'ramda'

import * as endpoints from 'src/constants/endpoints'
import { showNotification } from 'src/state/app/actions'
import * as types from '../types'
import { setSearch, setSearchQuery } from '../actions'

const fetchSearch = createLogic({
  type: types.FETCH_SEARCH,
  latest: true,

  async process({ httpClient, action }, dispatch, done) {
    const query = path(['payload', 'query'], action)
    const page = pathOr(1, ['payload', 'page'], action)

    try {
      const { data } = await httpClient.get(endpoints.searchMovies, {
        params: { query, page }
      })
      dispatch(setSearch(data))
      dispatch(setSearchQuery(query))
    } catch (error) {
      const errorMessage = or(path(['response', 'data', 'status_message'], error), error.message)
      dispatch(showNotification({ type: 'error', message: errorMessage }))
    }

    done()
  }
})

export default fetchSearch
