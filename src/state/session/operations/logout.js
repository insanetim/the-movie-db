import { createLogic } from 'redux-logic'
import Cookies from 'js-cookie'

import * as endpoints from 'src/constants/endpoints'
import * as types from '../types'
import { deleteSession } from '../actions'

const logout = createLogic({
  type: types.LOG_OUT,
  latest: true,
  async process({ httpClient, getState, action: { cb } }, dispatch, done) {
    const {
      session: { sessionId }
    } = getState()
    const { data } = await httpClient.delete(endpoints.deleteSession, {
      data: { session_id: sessionId }
    })
    if (data.success) {
      Cookies.remove('session_id')
      dispatch(deleteSession())
      cb()
    }
    done()
  }
})

export default logout
