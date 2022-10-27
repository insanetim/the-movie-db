import { createLogic } from 'redux-logic'
import Cookies from 'js-cookie'

import * as endpoints from 'src/constants/endpoints'
import { loadingOn, loadingOff, showNotification } from 'src/state/app/actions'
import * as types from '../types'

const login = createLogic({
  type: types.LOG_IN,
  cancelType: types.LOG_IN_CANCEL,
  latest: true,
  async process({ httpClient, action: { payload, cb } }, dispatch, done) {
    dispatch(loadingOn())
    const { data: requestTokenData } = await httpClient.get(endpoints.createRequestToken)
    const { data: sessionToken } = await httpClient
      .post(endpoints.createSessionWithLogin, {
        request_token: requestTokenData.request_token,
        ...payload
      })
      .catch(error => {
        dispatch(showNotification({ type: 'error', message: error.response.data.status_message }))
        dispatch(loadingOff())
        dispatch({ type: types.LOG_IN_CANCEL })
        done()
      })
    const { data } = await httpClient.post(endpoints.createSession, {
      request_token: sessionToken.request_token
    })
    Cookies.set('session_id', data.session_id)
    dispatch(loadingOff())
    cb()
    done()
  }
})

export default login
