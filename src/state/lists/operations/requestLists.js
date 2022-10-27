import { createLogic } from 'redux-logic'

import * as endpoints from 'src/constants/endpoints'
import { setLists } from '../actions'
import * as types from '../types'

const requestLists = createLogic({
  type: types.REQUEST_LISTS,
  latest: true,
  async process({ httpClient, getState, action: { payload: page = 1, cb } }, dispatch, done) {
    const {
      session: {
        sessionId,
        account: { id }
      }
    } = getState()
    const { data } = await httpClient.get(endpoints.getCreatedLists(id), {
      params: { session_id: sessionId, page }
    })
    dispatch(setLists(data))
    if (cb) cb()
    done()
  }
})

export default requestLists
