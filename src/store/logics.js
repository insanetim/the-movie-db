import { createLogic } from 'redux-logic'
import { notification } from 'antd'
import * as Cookies from 'js-cookie'

import { API_KEY } from 'src/constants'
import { LOG_IN, LOG_IN_CANCEL, LOG_OUT, SHOW_NOTIFICATION } from './types'
import { loadingOff, loadingOn, setSession, showNotification } from './actions'

const notificationLogic = createLogic({
  type: SHOW_NOTIFICATION,
  latest: true,
  process({ action }) {
    notification[action.payload.type]({
      message: action.payload.message
    })
  }
})

const loginLogic = createLogic({
  type: LOG_IN,
  cancelType: LOG_IN_CANCEL,
  latest: true,
  async process({ httpClient, action }, dispatch, done) {
    dispatch(loadingOn())
    const { data: requestTokenData } = await httpClient.get(`/authentication/token/new${API_KEY}`)
    const { data: sessionToken } = await httpClient
      .post(`/authentication/token/validate_with_login${API_KEY}`, {
        request_token: requestTokenData.request_token,
        ...action.payload
      })
      .catch(error => {
        dispatch(showNotification({ type: 'error', message: error.response.data.status_message }))
        dispatch(loadingOff())
        dispatch({ type: LOG_IN_CANCEL })
        done()
      })
    const { data } = await httpClient.post(`/authentication/session/new${API_KEY}`, {
      request_token: sessionToken.request_token
    })
    Cookies.set('session_id', data.session_id)
    dispatch(loadingOff())
    action.cb()
    done()
  }
})

const logoutLogic = createLogic({
  type: LOG_OUT,
  latest: true,
  async process({ httpClient, getState, action }, dispatch, done) {
    const { sessionId } = getState()
    const { data } = await httpClient.delete(`/authentication/session${API_KEY}`, {
      data: { session_id: sessionId }
    })
    if (data.success) {
      Cookies.remove('session_id')
      dispatch(setSession(null))
      action.cb()
    }
    done()
  }
})

export default [notificationLogic, loginLogic, logoutLogic]
