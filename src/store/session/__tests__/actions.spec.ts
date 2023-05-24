import Cookies from 'js-cookie'

import { dispatch, getState } from 'src/__mocks__/react-redux'
import httpClient from 'src/lib/api/httpClient'
import * as routes from 'src/lib/apiRoutes'
import { showNotification } from 'src/store/app/actions'
import { logIn, logOut, fetchAccount } from '../actions'
import { NOTIFICATION_TYPE } from 'src/constants/app'

jest.mock<typeof import('@reduxjs/toolkit')>('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: jest.fn(() => 'nonoid')
}))

jest.mock('src/store/session/selectors', () => ({
  sessionIdSelector: jest.fn(() => 'session_id')
}))

describe('session actions', () => {
  const requestSpy = jest.spyOn(httpClient, 'request')
  const cookiesSetSpy = jest.spyOn(Cookies, 'set')
  const cookiesRemoveSpy = jest.spyOn(Cookies, 'remove')
  const errorNotification = showNotification({
    messageType: NOTIFICATION_TYPE.ERROR,
    messageText: 'Something went wrong!'
  })

  describe('logIn', () => {
    const userData = {
      username: 'test/username',
      password: 'test/password'
    }
    const action = logIn(userData)

    const requestTokenRequest = { url: routes.createRequestToken }
    const requestTokenResponse = { data: { request_token: 'test/request_token' } }
    const validateWithLoginRequest = {
      url: routes.validateWithLogin,
      method: 'post',
      data: { ...userData, request_token: requestTokenResponse.data.request_token }
    }
    const createSessionRequest = {
      url: routes.createSession,
      method: 'post',
      data: { request_token: requestTokenResponse.data.request_token }
    }
    const sessionResponse = { data: { session_id: 'test/session_id' } }

    it('success', async () => {
      requestSpy
        .mockResolvedValueOnce(requestTokenResponse)
        .mockResolvedValueOnce(requestTokenResponse)
        .mockResolvedValueOnce(sessionResponse)

      const result = await action(dispatch, getState, undefined)

      expect(requestSpy).toHaveBeenCalledTimes(3)
      expect(requestSpy).toHaveBeenNthCalledWith(1, requestTokenRequest)
      expect(requestSpy).toHaveBeenNthCalledWith(2, validateWithLoginRequest)
      expect(requestSpy).toHaveBeenNthCalledWith(3, createSessionRequest)
      expect(cookiesSetSpy).toHaveBeenCalledWith('session_id', sessionResponse.data.session_id)
      expect(result.payload).toEqual(sessionResponse.data.session_id)
    })

    it('failure', async () => {
      requestSpy.mockRejectedValueOnce('Something went wrong!')

      await action(dispatch, getState, undefined)

      expect(dispatch).toHaveBeenCalledWith(errorNotification)
    })
  })

  describe('logOut', () => {
    const action = logOut()

    const request = {
      url: routes.deleteSession,
      method: 'delete',
      data: { session_id: 'session_id' }
    }
    const response = { data: { success: true } }

    it('success', async () => {
      requestSpy.mockResolvedValueOnce(response)

      await action(dispatch, getState, undefined)

      expect(requestSpy).toHaveBeenCalledTimes(1)
      expect(requestSpy).toHaveBeenCalledWith(request)
      expect(cookiesRemoveSpy).toHaveBeenCalledWith('session_id')
    })

    it('failure', async () => {
      requestSpy.mockRejectedValueOnce('Something went wrong!')

      await action(dispatch, getState, undefined)

      expect(dispatch).toHaveBeenCalledWith(errorNotification)
    })
  })

  describe('fetchAccount', () => {
    const action = fetchAccount()

    const request = {
      url: routes.getAccountDetails,
      params: { session_id: 'session_id' }
    }
    const response = { data: 'test/data' }

    it('success', async () => {
      requestSpy.mockResolvedValueOnce(response)

      const result = await action(dispatch, getState, undefined)

      expect(requestSpy).toHaveBeenCalledTimes(1)
      expect(requestSpy).toHaveBeenCalledWith(request)
      expect(result.payload).toEqual(response.data)
    })

    it('failure', async () => {
      requestSpy.mockRejectedValueOnce('Something went wrong!')

      await action(dispatch, getState, undefined)

      expect(dispatch).toHaveBeenCalledWith(errorNotification)
    })
  })
})
