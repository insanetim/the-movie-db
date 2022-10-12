import { createLogic } from 'redux-logic'
import { notification as AntdNotification } from 'antd'
import * as Cookies from 'js-cookie'

import {
  createRequestToken,
  createSession,
  createSessionWithLogin,
  deleteSession,
  getDetails,
  getTrending,
  searchMovies
} from 'src/constants/routes'
import {
  LOG_IN,
  LOG_IN_CANCEL,
  LOG_OUT,
  REQUEST_ACCOUNT,
  REQUEST_SEARCH,
  REQUEST_TRENDING,
  SET_ACCOUNT,
  SET_TRENDING,
  SHOW_NOTIFICATION
} from './types'
import { loadingOff, loadingOn, setSearchQuery, setSearchResult, setSession, showNotification } from './actions'

const notification = createLogic({
  type: SHOW_NOTIFICATION,
  latest: true,
  process({ action }) {
    AntdNotification[action.payload.type]({
      message: action.payload.message
    })
  }
})

const login = createLogic({
  type: LOG_IN,
  cancelType: LOG_IN_CANCEL,
  latest: true,
  async process({ httpClient, action }, dispatch, done) {
    dispatch(loadingOn())
    const { data: requestTokenData } = await httpClient.get(createRequestToken)
    const { data: sessionToken } = await httpClient
      .post(createSessionWithLogin, {
        request_token: requestTokenData.request_token,
        ...action.payload
      })
      .catch(error => {
        dispatch(showNotification({ type: 'error', message: error.response.data.status_message }))
        dispatch(loadingOff())
        dispatch({ type: LOG_IN_CANCEL })
        done()
      })
    const { data } = await httpClient.post(createSession, {
      request_token: sessionToken.request_token
    })
    Cookies.set('session_id', data.session_id)
    dispatch(loadingOff())
    action.cb()
    done()
  }
})

const logout = createLogic({
  type: LOG_OUT,
  latest: true,
  async process({ httpClient, getState, action }, dispatch, done) {
    const { sessionId } = getState()
    const { data } = await httpClient.delete(deleteSession, {
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

const requestAccount = createLogic({
  type: REQUEST_ACCOUNT,
  latest: true,
  async process({ httpClient, getState }, dispatch, done) {
    const { sessionId } = getState()
    const { data } = await httpClient.get(getDetails, {
      params: {
        session_id: sessionId
      }
    })
    dispatch({ type: SET_ACCOUNT, payload: data })
    done()
  }
})

const requestTrending = createLogic({
  type: REQUEST_TRENDING,
  latest: true,
  async process({ httpClient, action }, dispatch, done) {
    const { data } = await httpClient.get(getTrending, {
      params: {
        page: action.payload
      }
    })
    dispatch({ type: SET_TRENDING, payload: data })
    done()
  }
})

const requestSearch = createLogic({
  type: REQUEST_SEARCH,
  latest: true,
  async process({ httpClient, action }, dispatch, done) {
    dispatch(setSearchQuery(action.payload.query))
    const { data } = await httpClient.get(searchMovies, {
      params: {
        query: action.payload.query,
        page: action.payload.page
      }
    })
    dispatch(setSearchResult(data))
    done()
  }
})

export default [notification, login, logout, requestAccount, requestTrending, requestSearch]
