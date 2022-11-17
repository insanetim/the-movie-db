import { createLogic } from 'redux-logic'
import Cookies from 'js-cookie'
import { or, path, pathOr } from 'ramda'

import * as endpoints from 'src/constants/endpoints'
import { showNotification } from 'src/state/app/actions'
import * as types from '../types'
import { deleteSession } from '../actions'
import { sessionIdSelector } from '../selectors'

const logOut = createLogic({
  type: types.LOG_OUT,
  latest: true,

  async process({ httpClient, getState, action }, dispatch, done) {
    const sessionId = sessionIdSelector(getState())
    const callback = pathOr(null, ['callback'], action)

    try {
      await httpClient.delete(endpoints.deleteSession, { data: { session_id: sessionId } })
      Cookies.remove('session_id')
      dispatch(deleteSession())
      if (typeof callback === 'function') callback()
    } catch (error) {
      const errorMessage = or(path(['response', 'data', 'status_message'], error), error.message)
      dispatch(showNotification({ type: 'error', message: errorMessage }))
    }

    done()
  }
})

export default logOut
