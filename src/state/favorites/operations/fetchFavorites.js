import { createLogic } from 'redux-logic'

import * as endpoints from 'src/constants/endpoints'
import { accountSelector, sessionIdSelector } from 'src/state/session/selectors'
import * as types from '../types'
import { fetchFavoritesRequest, fetchFavoritesSuccess, fetchFavoritesFailure } from '../actions'

const fetchFavorites = createLogic({
  type: types.FETCH_FAVORITES,
  latest: true,

  async process({ httpClient, getState, action }, dispatch, done) {
    const sessionId = sessionIdSelector(getState())
    const { id: accountId } = accountSelector(getState())
    const page = action.payload

    dispatch(fetchFavoritesRequest(page))

    try {
      const { data } = await httpClient.get(endpoints.getFavorites(accountId), {
        params: { session_id: sessionId, page }
      })
      dispatch(fetchFavoritesSuccess(data))
    } catch (error) {
      dispatch(fetchFavoritesFailure(error))
    }

    done()
  }
})

export default fetchFavorites
