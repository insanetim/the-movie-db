import Cookies from 'js-cookie'

import mockHttpClient, { mockMultiHttpClient } from 'src/__mocks__/mockHttpClient'
import { loadingOn, loadingOff, showNotification } from 'src/state/app/actions'
import * as types from '../../types'
import logIn from '../logIn'

jest.spyOn(Cookies, 'set')

describe('logIn', () => {
  const dispatch = jest.fn()
  const callback = jest.fn()

  const action = {
    type: types.LOG_IN,
    payload: {
      username: 'test/user',
      password: 'test/password'
    }
  }

  const requestTokenUrl = '/authentication/token/new'
  const requestTokenResponse = {
    data: {
      request_token: 'request_token'
    }
  }

  const sessionTokenUrl = '/authentication/token/validate_with_login'
  const sessionTokenBody = {
    request_token: requestTokenResponse.data.request_token,
    ...action.payload
  }
  const sessionTokenResponse = {
    data: {
      request_token: 'session_token'
    }
  }

  const sessionUrl = '/authentication/session/new'
  const sessionBody = { request_token: sessionTokenResponse.data.request_token }
  const sessionResponse = {
    data: {
      session_id: 'session_id'
    }
  }

  const beforeFunction = httpClient => () => {
    logIn.process(
      {
        httpClient,
        action
      },
      dispatch,
      jest.fn()
    )
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('has valid attributes', () => {
    expect(logIn).toMatchSnapshot()
  })

  describe('success', () => {
    it('calls right endpoint', async () => {
      const httpClient = mockMultiHttpClient([
        { method: 'get', response: requestTokenResponse },
        { method: 'post', response: sessionTokenResponse },
        { method: 'post', response: sessionResponse }
      ])

      await logIn.process(
        {
          httpClient,
          action
        },
        dispatch,
        jest.fn()
      )

      expect(httpClient.get).toHaveBeenCalledTimes(1)
      expect(httpClient.get).toHaveBeenCalledWith(requestTokenUrl)
      expect(httpClient.post).toHaveBeenCalledTimes(2)
      expect(httpClient.post).toHaveBeenNthCalledWith(1, sessionTokenUrl, sessionTokenBody)
      expect(httpClient.post).toHaveBeenNthCalledWith(2, sessionUrl, sessionBody)
    })

    it('dispatches actions', async () => {
      const httpClient = mockMultiHttpClient([
        { method: 'get', response: requestTokenResponse },
        { method: 'post', response: sessionTokenResponse },
        { method: 'post', response: sessionResponse }
      ])

      await logIn.process(
        {
          httpClient,
          action,
          getState: jest.fn()
        },
        dispatch,
        jest.fn()
      )

      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch).toHaveBeenNthCalledWith(1, loadingOn())
      expect(dispatch).toHaveBeenNthCalledWith(2, loadingOff())
      expect(Cookies.set).toHaveBeenCalledTimes(1)
      expect(Cookies.set).toHaveBeenCalledWith('session_id', 'session_id')
    })
  })

  describe('callback', () => {
    const httpClient = mockMultiHttpClient([
      { method: 'get', response: requestTokenResponse },
      { method: 'post', response: sessionTokenResponse },
      { method: 'post', response: sessionResponse }
    ])

    const actionExt = {
      ...action,
      callback
    }

    it('calls callback', async () => {
      await logIn.process(
        {
          httpClient,
          action: actionExt,
          getState: jest.fn()
        },
        dispatch,
        jest.fn()
      )

      expect(callback).toHaveBeenCalledTimes(1)
    })
  })

  describe('failure', () => {
    const error = new Error('test/error')

    const httpClient = mockHttpClient({
      method: 'get',
      reject: true,
      response: error
    })

    beforeEach(beforeFunction(httpClient))

    it('dispatches actions', () => {
      expect(dispatch).toHaveBeenCalledTimes(3)
      expect(dispatch).toHaveBeenNthCalledWith(2, showNotification({ type: 'error', message: 'test/error' }))
    })
  })
})
