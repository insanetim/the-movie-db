import type { IAccount } from 'src/interfaces/account.interface'

import { createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { NOTIFICATION_TYPE } from 'src/constants/app'
import httpClient from 'src/lib/api/httpClient'
import * as routes from 'src/lib/apiRoutes'
import { showNotification } from 'src/store/app/actions'
import errorMessage from 'src/utils/helpers/errorMessage'

import type { RootState } from '../index'
import type { IRequestToken, ISession, IUserData } from './types'

import * as types from './constants'
import { sessionIdSelector } from './selectors'

const logIn = createAsyncThunk(
  types.logIn,
  async (userData: IUserData, { dispatch }) => {
    try {
      const {
        data: { request_token: requestToken }
      } = await httpClient.request<IRequestToken>({
        url: routes.createRequestToken
      })

      await httpClient.request({
        data: { ...userData, request_token: requestToken },
        method: 'post',
        url: routes.validateWithLogin
      })

      const {
        data: { session_id: sessionId }
      } = await httpClient.request<ISession>({
        data: { request_token: requestToken },
        method: 'post',
        url: routes.createSession
      })

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

const logOut = createAsyncThunk(
  types.logOut,
  async (_, { dispatch, getState }) => {
    const sessionId = sessionIdSelector(getState() as RootState)

    try {
      await httpClient.request({
        data: { session_id: sessionId },
        method: 'delete',
        url: routes.deleteSession
      })

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

const fetchAccount = createAsyncThunk(
  types.fetchAccount,
  async (_, { dispatch, getState }) => {
    const sessionId = sessionIdSelector(getState() as RootState)

    try {
      const { data } = await httpClient.request<IAccount>({
        params: { session_id: sessionId },
        url: routes.getAccountDetails
      })

      return data
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

export { fetchAccount, logIn, logOut }
