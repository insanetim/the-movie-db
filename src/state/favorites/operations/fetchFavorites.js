import { createLogic } from 'redux-logic'
import { pathOr } from 'ramda'

import * as endpoints from 'src/constants/endpoints'
import { accountSelector, sessionIdSelector } from 'src/state/session/selectors'
import { showNotification } from 'src/state/app/actions'
import * as types from '../types'
import { setFavorites } from '../actions'

const fetchFavorites = createLogic({
  type: types.FETCH_FAVORITES,
  latest: true,

  async process({ httpClient, getState, action }, dispatch, done) {
    const sessionId = sessionIdSelector(getState())
    const { id: accountId } = accountSelector(getState())
    const page = pathOr(1, ['payload'], action)

    try {
      const { data } = await httpClient.get(endpoints.getFavorites(accountId), {
        params: { session_id: sessionId, page }
      })
      dispatch(setFavorites(data))
    } catch (error) {
      dispatch(showNotification({ type: 'error', message: error.message }))
    }

    done()
  }
})

export default fetchFavorites
