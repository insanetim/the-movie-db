import { createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { NOTIFICATION_TYPE } from 'src/constants/app'
import { IAccount } from 'src/interfaces/account.interface'
import {
  createRequestToken,
  createSession,
  deleteSession,
  getAccountDetails,
  validateWithLogin
} from 'src/libs/apiRoutes'
import { showNotification } from 'src/store/app/actions'
import errorMessage from 'src/utils/helpers/errorMessage'

import { RootState } from '../index'
import * as types from './constants'
import { sessionIdSelector } from './selectors'
import { IUserData } from './types'

const logIn = createAsyncThunk<string | undefined, IUserData>(
  types.logIn,
  async function (userData, { dispatch }) {
    try {
      const requestToken = await createRequestToken()
      await validateWithLogin({ requestToken, userData })
      const sessionId = await createSession({ requestToken })

      Cookies.set('tmdb.session_id', sessionId)

      return sessionId
    } catch (error) {
      dispatch(
        showNotification({
          messageText: errorMessage(error),
          messageType: NOTIFICATION_TYPE.ERROR
        })
      )
    }
  }
)

const logOut = createAsyncThunk<void, undefined, { state: RootState }>(
  types.logOut,
  async function (_, { dispatch, getState }) {
    const sessionId = sessionIdSelector(getState())

    try {
      await deleteSession({ sessionId })

      Cookies.remove('tmdb.session_id')
    } catch (error) {
      dispatch(
        showNotification({
          messageText: errorMessage(error),
          messageType: NOTIFICATION_TYPE.ERROR
        })
      )
    }
  }
)

const fetchAccount = createAsyncThunk<
  IAccount | undefined,
  undefined,
  { state: RootState }
>(types.fetchAccount, async function (_, { dispatch, getState }) {
  const sessionId = sessionIdSelector(getState())

  try {
    const account = await getAccountDetails({ sessionId })

    return account
  } catch (error) {
    dispatch(
      showNotification({
        messageText: errorMessage(error),
        messageType: NOTIFICATION_TYPE.ERROR
      })
    )
  }
})

export { fetchAccount, logIn, logOut }
