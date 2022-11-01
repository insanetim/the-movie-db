import { createLogic } from 'redux-logic'

import * as endpoints from 'src/constants/endpoints'
import { accountSelector, sessionIdSelector } from 'src/state/session/selectors'
import * as types from '../types'
import { setWatchlist } from '../actions'

const fetchWatchlist = createLogic({
  type: types.FETCH_WATCHLIST,
  latest: true,
  async process({ httpClient, getState, action: { payload: page = 1 } }, dispatch, done) {
    const sessionId = sessionIdSelector(getState())
    const { id: accountId } = accountSelector(getState())
    const { data } = await httpClient.get(endpoints.getWatchlist(accountId), {
      params: { session_id: sessionId, page }
    })
    dispatch(setWatchlist(data))
    done()
  }
})

export default fetchWatchlist
