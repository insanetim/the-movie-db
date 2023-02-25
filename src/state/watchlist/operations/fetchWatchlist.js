import { createLogic } from 'redux-logic'

import * as endpoints from 'src/constants/endpoints'
import { accountSelector, sessionIdSelector } from 'src/state/session/selectors'
import * as types from '../types'
import { fetchWatchlistRequest, fetchWatchlistSuccess, fetchWatchlistFailure } from '../actions'

const fetchWatchlist = createLogic({
  type: types.FETCH_WATCHLIST,
  latest: true,

  async process({ httpClient, getState, action }, dispatch, done) {
    const sessionId = sessionIdSelector(getState())
    const { id: accountId } = accountSelector(getState())
    const page = action.payload

    dispatch(fetchWatchlistRequest(page))

    try {
      const { data } = await httpClient.get(endpoints.getWatchlist(accountId), {
        params: { session_id: sessionId, page }
      })
      dispatch(fetchWatchlistSuccess(data))
    } catch (error) {
      dispatch(fetchWatchlistFailure(error))
    }

    done()
  }
})

export default fetchWatchlist
