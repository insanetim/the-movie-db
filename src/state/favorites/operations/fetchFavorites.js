import { createLogic } from 'redux-logic'

import * as endpoints from 'src/constants/endpoints'
import * as types from '../types'
import { setFavorites } from '../actions'

const fetchFavorites = createLogic({
  type: types.FETCH_FAVORITES,
  latest: true,
  async process({ httpClient, getState, action: { payload: page = 1 } }, dispatch, done) {
    const {
      session: {
        sessionId,
        account: { id }
      }
    } = getState()
    const { data } = await httpClient.get(endpoints.getFavorites(id), {
      params: { session_id: sessionId, page }
    })
    dispatch(setFavorites(data))
    done()
  }
})

export default fetchFavorites
