import { createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { or, path } from 'ramda'

import httpClient from 'src/api/httpClient'
import * as endpoints from 'src/constants/endpoints'
import { showNotification } from 'src/state/app/actions'
import { sessionIdSelector } from './selectors'
import * as types from './types'

export const setSession = sessionId => ({
  type: types.SET_SESSION,
  payload: sessionId
})

export const deleteSession = () => ({
  type: types.DELETE_SESSION
})

export const fetchAccount = () => ({
  type: types.FETCH_ACCOUNT
})

export const fetchAccountSuccess = account => ({
  type: types.FETCH_ACCOUNT_SUCCESS,
  payload: account
})

export const loadingOn = () => ({
  type: types.LOADING_ON
})

export const loadingOff = () => ({
  type: types.LOADING_OFF
})

export const logIn = createAsyncThunk(types.LOG_IN, async (userData, { dispatch }) => {
  dispatch(loadingOn())

  try {
    const { data: requestToken } = await httpClient.get(endpoints.createRequestToken)
    const { data: sessionToken } = await httpClient.post(endpoints.createSessionWithLogin, {
      request_token: requestToken.request_token,
      ...userData
    })
    const { data } = await httpClient.post(endpoints.createSession, { request_token: sessionToken.request_token })
    Cookies.set('session_id', data.session_id)
    dispatch(setSession(data.session_id))
  } catch (error) {
    const errorMessage = or(path(['response', 'data', 'status_message'], error), error.message)
    dispatch(showNotification({ messageType: 'error', messageText: errorMessage }))
  }

  dispatch(loadingOff())
})

export const logOut = createAsyncThunk(types.LOG_OUT, async (_, { dispatch, getState }) => {
  const sessionId = sessionIdSelector(getState())

  try {
    await httpClient.delete(endpoints.deleteSession, { data: { session_id: sessionId } })
    Cookies.remove('session_id')
    dispatch(deleteSession())
  } catch (error) {
    const errorMessage = or(path(['response', 'data', 'status_message'], error), error.message)
    dispatch(showNotification({ messageType: 'error', messageText: errorMessage }))
  }
})
