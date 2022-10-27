import { createLogic } from 'redux-logic'

import * as endpoints from 'src/constants/endpoints'
import { setFavorites } from '../actions'
import * as types from '../types'

const requestFavorites = createLogic({
  type: types.REQUEST_FAVORITES,
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

export default requestFavorites
