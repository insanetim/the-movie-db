import type { IAccount } from 'src/interfaces/account.interface'

import { createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { pathOr } from 'ramda'
import { NOTIFICATION_TYPE } from 'src/constants/app'
import httpClient from 'src/lib/api/httpClient'
import * as routes from 'src/lib/apiRoutes'
import { showNotification } from 'src/store/app/actions'

import type { RootState } from '../index'
import type { IRequestToken, ISession, IUserData } from './types'

import { FETCH_ACCOUNT, LOG_IN, LOG_OUT } from './constants'
import { sessionIdSelector } from './selectors'

export const logIn = createAsyncThunk(LOG_IN, async (userData: IUserData, { dispatch, fulfillWithValue }) => {
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

    Cookies.set('session_id', sessionId)

    return fulfillWithValue(sessionId)
  } catch (error) {
    const messageText = pathOr('Something went wrong!', ['response', 'data', 'status_message'], error)

    dispatch(
      showNotification({
        messageText,
        messageType: NOTIFICATION_TYPE.ERROR
      })
    )
  }
})

export const logOut = createAsyncThunk(LOG_OUT, async (_, { dispatch, getState }) => {
  const sessionId = sessionIdSelector(getState() as RootState)

  try {
    await httpClient.request({
      data: { session_id: sessionId },
      method: 'delete',
      url: routes.deleteSession
    })

    Cookies.remove('session_id')
  } catch (error) {
    const messageText = pathOr('Something went wrong!', ['response', 'data', 'status_message'], error)

    dispatch(
      showNotification({
        messageText,
        messageType: NOTIFICATION_TYPE.ERROR
      })
    )
  }
})

export const fetchAccount = createAsyncThunk(FETCH_ACCOUNT, async (_, { dispatch, fulfillWithValue, getState }) => {
  const sessionId = sessionIdSelector(getState() as RootState)

  try {
    const { data } = await httpClient.request<IAccount>({
      params: { session_id: sessionId },
      url: routes.getAccountDetails
    })

    return fulfillWithValue(data)
  } catch (error) {
    const messageText = pathOr('Something went wrong!', ['response', 'data', 'status_message'], error)

    dispatch(
      showNotification({
        messageText,
        messageType: NOTIFICATION_TYPE.ERROR
      })
    )
  }
})
