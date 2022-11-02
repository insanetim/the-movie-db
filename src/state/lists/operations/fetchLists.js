import { createLogic } from 'redux-logic'

import * as endpoints from 'src/constants/endpoints'
import { accountSelector, sessionIdSelector } from 'src/state/session/selectors'
import { showNotification } from 'src/state/app/actions'
import * as types from '../types'
import { setLists } from '../actions'

const fetchLists = createLogic({
  type: types.FETCH_LISTS,
  latest: true,
  async process({ httpClient, getState, action: { payload: page = 1, cb } }, dispatch, done) {
    const sessionId = sessionIdSelector(getState())
    const { id: accountId } = accountSelector(getState())
    try {
      const { data } = await httpClient.get(endpoints.getCreatedLists(accountId), {
        params: { session_id: sessionId, page }
      })
      dispatch(setLists(data))
      if (typeof cb === 'function') cb()
    } catch (error) {
      dispatch(showNotification({ type: 'error', message: error.message }))
    }
    done()
  }
})

export default fetchLists
