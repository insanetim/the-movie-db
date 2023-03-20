import Cookies from 'js-cookie'

import httpClient from 'src/api/httpClient'
import { showNotification } from 'src/store/app/actions'
import * as actions from '../actions'
import * as types from '../types'

it('setSession', () => {
  const expectedAction = {
    type: types.SET_SESSION,
    payload: 'test/sessionId'
  }

  expect(actions.setSession('test/sessionId')).toEqual(expectedAction)
})

it('deleteSession', () => {
  const expectedAction = {
    type: types.DELETE_SESSION
  }

  expect(actions.deleteSession()).toEqual(expectedAction)
})

it('fetchAccount', () => {
  const expectedAction = {
    type: types.FETCH_ACCOUNT
  }

  expect(actions.fetchAccount()).toEqual(expectedAction)
})

it('fetchAccountSuccess', () => {
  const expectedAction = {
    type: types.FETCH_ACCOUNT_SUCCESS,
    payload: { id: 123 }
  }

  expect(actions.fetchAccountSuccess({ id: 123 })).toEqual(expectedAction)
})

it('loadingOn', () => {
  const expectedAction = {
    type: types.LOADING_ON
  }

  expect(actions.loadingOn()).toEqual(expectedAction)
})

it('loadingOff', () => {
  const expectedAction = {
    type: types.LOADING_OFF
  }

  expect(actions.loadingOff()).toEqual(expectedAction)
})

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'uuid/v4')
}))

describe('logIn', () => {
  const dispatch = jest.fn()

  const userData = {
    username: 'test/username',
    password: 'test/password'
  }

  const logInThunk = actions.logIn(userData)

  const requestTokenUrl = '/authentication/token/new'
  const requestTokenResponse = { data: { request_token: 'test/request_token' } }

  const sessionTokenUrl = '/authentication/token/validate_with_login'
  const sessionTokenBody = { request_token: requestTokenResponse.data.request_token, ...userData }
  const sessionTokenResponse = { data: { request_token: 'test/session_token' } }

  const sessionUrl = '/authentication/session/new'
  const sessionBody = { request_token: sessionTokenResponse.data.request_token }
  const sessionResponse = { data: { session_id: 'test/session_id' } }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('success', async () => {
    const cookiesSpy = jest.spyOn(Cookies, 'set')
    const getSpy = jest.spyOn(httpClient, 'get').mockResolvedValueOnce(requestTokenResponse)
    const postSpy = jest
      .spyOn(httpClient, 'post')
      .mockResolvedValueOnce(sessionTokenResponse)
      .mockResolvedValueOnce(sessionResponse)

    await logInThunk(dispatch)

    expect(getSpy).toHaveBeenCalledTimes(1)
    expect(getSpy).toHaveBeenCalledWith(requestTokenUrl)
    expect(postSpy).toHaveBeenCalledTimes(2)
    expect(postSpy).toHaveBeenNthCalledWith(1, sessionTokenUrl, sessionTokenBody)
    expect(postSpy).toHaveBeenNthCalledWith(2, sessionUrl, sessionBody)

    expect(dispatch).toHaveBeenCalledWith(actions.loadingOn())
    expect(cookiesSpy).toHaveBeenCalledWith('session_id', 'test/session_id')
    expect(dispatch).toHaveBeenCalledWith(actions.setSession('test/session_id'))
    expect(dispatch).toHaveBeenCalledWith(actions.loadingOff())
  })

  it('failure', async () => {
    const error = new Error('test/error')
    jest.spyOn(httpClient, 'get').mockRejectedValueOnce(error)

    await logInThunk(dispatch)

    expect(dispatch).toHaveBeenCalledWith(showNotification({ messageType: 'error', messageText: 'test/error' }))
  })
})

jest.mock('src/store/session/selectors', () => ({
  sessionIdSelector: jest.fn(() => 'session_id')
}))

describe('logOut', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()

  const logOutThunk = actions.logOut()

  const url = '/authentication/session'
  const body = { data: { session_id: 'session_id' } }
  const response = { data: { success: true } }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('success', async () => {
    const cookiesSpy = jest.spyOn(Cookies, 'remove')
    const deleteSpy = jest.spyOn(httpClient, 'delete').mockResolvedValueOnce(response)

    await logOutThunk(dispatch, getState)

    expect(deleteSpy).toHaveBeenCalledTimes(1)
    expect(deleteSpy).toHaveBeenCalledWith(url, body)

    expect(dispatch).toHaveBeenCalledWith(actions.deleteSession())
    expect(cookiesSpy).toHaveBeenCalledWith('session_id')
  })

  it('failure', async () => {
    const error = new Error('test/error')
    jest.spyOn(httpClient, 'delete').mockRejectedValueOnce(error)

    await logOutThunk(dispatch, getState)

    expect(dispatch).toHaveBeenCalledWith(showNotification({ messageType: 'error', messageText: 'test/error' }))
  })
})
