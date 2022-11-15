import { createLogic } from 'redux-logic'
import { or, path, pathOr } from 'ramda'

import * as endpoints from 'src/constants/endpoints'
import { sessionIdSelector } from 'src/state/session/selectors'
import { showNotification } from 'src/state/app/actions'
import { fetchLists } from '../actions'
import * as types from '../types'

const createList = createLogic({
  type: types.CREATE_LIST,
  latest: true,

  async process({ httpClient, getState, action }, dispatch, done) {
    const sessionId = sessionIdSelector(getState())
    const payload = path(['payload'], action)
    const callback = pathOr(null, ['callback'], action)

    try {
      const { data } = await httpClient.post(
        endpoints.createList,
        { ...payload },
        { params: { session_id: sessionId } }
      )
      if (typeof callback === 'function') callback(data.list_id)
      dispatch(fetchLists())
    } catch (error) {
      const errorMessage = or(path(['response', 'data', 'status_message'], error), error.message)
      dispatch(showNotification({ type: 'error', message: errorMessage }))
    }

    done()
  }
})

export default createList
