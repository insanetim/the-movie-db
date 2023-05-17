import { createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { pathOr } from 'ramda'

import { NOTIFICATION_TYPE } from 'src/constants/app'
import httpClient from 'src/lib/api/httpClient'
import * as routes from 'src/lib/apiRoutes'
import type { RootState } from '../index'
import type { IAccount } from 'src/interfaces/account.interface'
import type { IRequestToken, ISession, IUserData } from './types'
import { sessionIdSelector } from './selectors'
import { showNotification } from 'src/store/app/actions'
import { FETCH_ACCOUNT, LOG_IN, LOG_OUT } from './constants'

export const logIn = createAsyncThunk(LOG_IN, async (userData: IUserData, { dispatch, fulfillWithValue }) => {
  try {
    const {
      data: { request_token: requestToken }
    } = await httpClient.request<IRequestToken>({
      url: routes.createRequestToken
    })

    await httpClient.request({
      url: routes.validateWithLogin,
      method: 'post',
      data: { ...userData, request_token: requestToken }
    })

    const {
      data: { session_id: sessionId }
    } = await httpClient.request<ISession>({
      url: routes.createSession,
      method: 'post',
      data: { request_token: requestToken }
    })

    Cookies.set('session_id', sessionId)

    return fulfillWithValue(sessionId)
  } catch (error) {
    const messageText = pathOr('Something went wrong!', ['response', 'data', 'status_message'], error)

    dispatch(
      showNotification({
        messageType: NOTIFICATION_TYPE.ERROR,
        messageText
      })
    )
  }
})

export const logOut = createAsyncThunk(LOG_OUT, async (_, { dispatch, getState }) => {
  const sessionId = sessionIdSelector(getState() as RootState)

  try {
    await httpClient.request({
      url: routes.deleteSession,
      method: 'delete',
      data: { session_id: sessionId }
    })

    Cookies.remove('session_id')
  } catch (error) {
    const messageText = pathOr('Something went wrong!', ['response', 'data', 'status_message'], error)

    dispatch(
      showNotification({
        messageType: NOTIFICATION_TYPE.ERROR,
        messageText
      })
    )
  }
})

export const fetchAccount = createAsyncThunk(FETCH_ACCOUNT, async (_, { dispatch, getState, fulfillWithValue }) => {
  const sessionId = sessionIdSelector(getState() as RootState)

  try {
    const { data } = await httpClient.request<IAccount>({
      url: routes.getAccountDetails,
      params: { session_id: sessionId }
    })

    return fulfillWithValue(data)
  } catch (error) {
    const messageText = pathOr('Something went wrong!', ['response', 'data', 'status_message'], error)

    dispatch(
      showNotification({
        messageType: NOTIFICATION_TYPE.ERROR,
        messageText
      })
    )
  }
})
