import { createLogic } from 'redux-logic'
import Cookies from 'js-cookie'
import { or, path, pathOr } from 'ramda'

import * as endpoints from 'src/constants/endpoints'
import { loadingOn, loadingOff, showNotification } from 'src/state/app/actions'
import * as types from '../types'

const logIn = createLogic({
  type: types.LOG_IN,
  latest: true,

  async process({ httpClient, action }, dispatch, done) {
    const payload = path(['payload'], action)
    const callback = pathOr(null, ['callback'], action)

    dispatch(loadingOn())

    try {
      const { data: requestToken } = await httpClient.get(endpoints.createRequestToken)
      const { data: sessionToken } = await httpClient.post(endpoints.createSessionWithLogin, {
        request_token: requestToken.request_token,
        ...payload
      })
      const { data } = await httpClient.post(endpoints.createSession, { request_token: sessionToken.request_token })
      Cookies.set('session_id', data.session_id)
      if (typeof callback === 'function') callback()
    } catch (error) {
      const errorMessage = or(path(['response', 'data', 'status_message'], error), error.message)
      dispatch(showNotification({ type: 'error', message: errorMessage }))
    }

    dispatch(loadingOff())

    done()
  }
})

export default logIn
