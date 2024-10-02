import Cookies from 'js-cookie'
import {
  createRequestToken,
  createSession,
  deleteSession,
  getAccountDetails,
  validateWithLogin,
} from 'src/api/tmdb/apiRoutes'
import { NOTIFICATION_TYPE } from 'src/constants/app'
import { showNotification } from 'src/store/app/actions'
import errorMessage from 'src/utils/helpers/errorMessage'
import getSessionId from 'src/utils/helpers/getSessionId'

import { createAppAsyncThunk } from '../withTypes'
import * as types from './constants'
import { UserData } from './types'

const logIn = createAppAsyncThunk(
  types.logIn,
  async function (userData: UserData, { dispatch }) {
    try {
      const requestToken = await createRequestToken()
      await validateWithLogin({ requestToken, userData })
      const sessionId = await createSession({ requestToken })

      Cookies.set('tmdb.session_id', sessionId)

      return sessionId
    } catch (error) {
      dispatch(
        showNotification({
          message: errorMessage(error),
          type: NOTIFICATION_TYPE.ERROR,
        })
      )
    }
  }
)

const logOut = createAppAsyncThunk(
  types.logOut,
  async function (_, { dispatch }) {
    const sessionId = getSessionId()

    try {
      await deleteSession({ sessionId })

      Cookies.remove('tmdb.session_id')
    } catch (error) {
      dispatch(
        showNotification({
          message: errorMessage(error),
          type: NOTIFICATION_TYPE.ERROR,
        })
      )
    }
  }
)

const fetchAccount = createAppAsyncThunk(
  types.fetchAccount,
  async function (_, { dispatch }) {
    const sessionId = getSessionId()

    try {
      const account = await getAccountDetails({ sessionId })

      return account
    } catch (error) {
      dispatch(
        showNotification({
          message: errorMessage(error),
          type: NOTIFICATION_TYPE.ERROR,
        })
      )
    }
  }
)

export { fetchAccount, logIn, logOut }
