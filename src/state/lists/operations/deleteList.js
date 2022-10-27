import { createLogic } from 'redux-logic'

import * as endpoints from 'src/constants/endpoints'
import { requestLists } from '../actions'
import * as types from '../types'

const deleteList = createLogic({
  type: types.DELETE_LIST,
  latest: true,
  async process({ httpClient, getState, action: { payload: listId, cb } }, dispatch, done) {
    const {
      session: { sessionId }
    } = getState()
    await httpClient
      .delete(endpoints.deleteList(listId), {
        params: { session_id: sessionId }
      })
      .finally(() => {
        dispatch(requestLists(1, cb))
        done()
      })
  }
})

export default deleteList
