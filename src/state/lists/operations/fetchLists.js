import { createLogic } from 'redux-logic'
import { or, path, pathOr } from 'ramda'

import * as endpoints from 'src/constants/endpoints'
import { accountSelector, sessionIdSelector } from 'src/state/session/selectors'
import { showNotification } from 'src/state/app/actions'
import * as types from '../types'
import { setLists } from '../actions'

const fetchLists = createLogic({
  type: types.FETCH_LISTS,
  latest: true,

  async process({ httpClient, getState, action }, dispatch, done) {
    const sessionId = sessionIdSelector(getState())
    const { id: accountId } = accountSelector(getState())
    const page = pathOr(1, ['payload'], action)
    const callback = pathOr(null, ['callback'], action)

    try {
      const { data } = await httpClient.get(endpoints.getCreatedLists(accountId), {
        params: { session_id: sessionId, page }
      })
      dispatch(setLists(data))
      if (typeof callback === 'function') callback()
    } catch (error) {
      const errorMessage = or(path(['response', 'data', 'status_message'], error), error.message)
      dispatch(showNotification({ type: 'error', message: errorMessage }))
    }

    done()
  }
})

export default fetchLists
