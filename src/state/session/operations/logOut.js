import { createLogic } from 'redux-logic'
import Cookies from 'js-cookie'

import * as endpoints from 'src/constants/endpoints'
import { showNotification } from 'src/state/app/actions'
import * as types from '../types'
import { deleteSession } from '../actions'
import { sessionIdSelector } from '../selectors'

const logOut = createLogic({
  type: types.LOG_OUT,
  latest: true,
  async process({ httpClient, getState, action: { cb } }, dispatch, done) {
    const sessionId = sessionIdSelector(getState())
    try {
      await httpClient
        .delete(endpoints.deleteSession, {
          data: { session_id: sessionId }
        })
        .then(() => {
          Cookies.remove('session_id')
          dispatch(deleteSession())
          if (typeof cb === 'function') cb()
        })
    } catch (error) {
      dispatch(showNotification({ type: 'error', message: error.message }))
    }
    done()
  }
})

export default logOut
