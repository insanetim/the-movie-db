import { createLogic } from 'redux-logic'

import * as endpoints from 'src/constants/endpoints'
import * as types from '../types'
import { setLists } from '../actions'

const fetchLists = createLogic({
  type: types.FETCH_LISTS,
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

export default fetchLists
