import Cookies from 'js-cookie'
import { dispatch, getState } from 'src/__mocks__/react-redux'
import { NOTIFICATION_TYPE } from 'src/constants/app'
import httpClient from 'src/lib/api/httpClient'
import * as routes from 'src/lib/apiRoutes'
import { showNotification } from 'src/store/app/actions'

import { fetchAccount, logIn, logOut } from '../actions'

jest.mock<typeof import('@reduxjs/toolkit')>('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: () => 'test/id'
}))

jest.mock('src/store/session/selectors', () => ({
  sessionIdSelector: () => 'session_id'
}))

describe('session actions', () => {
  const requestSpy = jest.spyOn(httpClient, 'request')
  const cookiesSetSpy = jest.spyOn(Cookies, 'set')
  const cookiesRemoveSpy = jest.spyOn(Cookies, 'remove')
  const errorNotification = showNotification({
    messageText: 'Something went wrong!',
    messageType: NOTIFICATION_TYPE.ERROR
  })

  describe('logIn', () => {
    const userData = {
      password: 'test/password',
      username: 'test/username'
    }
    const thunk = logIn(userData)

    const requestTokenRequest = { url: routes.createRequestToken }
    const requestTokenResponse = {
      data: { request_token: 'test/request_token' }
    }
    const validateWithLoginRequest = {
      data: {
        ...userData,
        request_token: requestTokenResponse.data.request_token
      },
      method: 'post',
      url: routes.validateWithLogin
    }
    const createSessionRequest = {
      data: { request_token: requestTokenResponse.data.request_token },
      method: 'post',
      url: routes.createSession
    }
    const sessionResponse = { data: { session_id: 'test/session_id' } }

    it('should handle success', async () => {
      requestSpy
        .mockResolvedValueOnce(requestTokenResponse)
        .mockResolvedValueOnce(requestTokenResponse)
        .mockResolvedValueOnce(sessionResponse)

      const result = await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(requestSpy).toHaveBeenCalledTimes(3)
      expect(requestSpy).toHaveBeenNthCalledWith(1, requestTokenRequest)
      expect(requestSpy).toHaveBeenNthCalledWith(2, validateWithLoginRequest)
      expect(requestSpy).toHaveBeenNthCalledWith(3, createSessionRequest)
      expect(cookiesSetSpy).toHaveBeenCalledWith(
        'tmdb.session_id',
        sessionResponse.data.session_id
      )
      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(logIn.pending.type)
      expect(calls[1][0].type).toBe(logIn.fulfilled.type)
      expect(result.payload).toEqual(sessionResponse.data.session_id)
    })

    it('should handle failure', async () => {
      requestSpy.mockRejectedValueOnce('Something went wrong!')

      await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(calls).toHaveLength(3)
      expect(calls[0][0].type).toBe(logIn.pending.type)
      expect(calls[1][0].type).toBe(showNotification.type)
      expect(calls[2][0].type).toBe(logIn.fulfilled.type)
      expect(dispatch).toHaveBeenCalledWith(errorNotification)
    })
  })

  describe('logOut', () => {
    const thunk = logOut()

    const request = {
      data: { session_id: 'session_id' },
      method: 'delete',
      url: routes.deleteSession
    }
    const response = { data: { success: true } }

    it('should handle success', async () => {
      requestSpy.mockResolvedValueOnce(response)

      await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(requestSpy).toHaveBeenCalledTimes(1)
      expect(requestSpy).toHaveBeenCalledWith(request)
      expect(cookiesRemoveSpy).toHaveBeenCalledWith('tmdb.session_id')
      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(logOut.pending.type)
      expect(calls[1][0].type).toBe(logOut.fulfilled.type)
    })

    it('should handle failure', async () => {
      requestSpy.mockRejectedValueOnce('Something went wrong!')

      await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(calls).toHaveLength(3)
      expect(calls[0][0].type).toBe(logOut.pending.type)
      expect(calls[1][0].type).toBe(showNotification.type)
      expect(calls[2][0].type).toBe(logOut.fulfilled.type)
      expect(dispatch).toHaveBeenCalledWith(errorNotification)
    })
  })

  describe('fetchAccount', () => {
    const thunk = fetchAccount()

    const request = {
      params: { session_id: 'session_id' },
      url: routes.getAccountDetails
    }
    const response = { data: 'test/data' }

    it('should handle success', async () => {
      requestSpy.mockResolvedValueOnce(response)

      const result = await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(requestSpy).toHaveBeenCalledTimes(1)
      expect(requestSpy).toHaveBeenCalledWith(request)
      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(fetchAccount.pending.type)
      expect(calls[1][0].type).toBe(fetchAccount.fulfilled.type)
      expect(result.payload).toEqual(response.data)
    })

    it('should handle failure', async () => {
      requestSpy.mockRejectedValueOnce('Something went wrong!')

      await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(calls).toHaveLength(3)
      expect(calls[0][0].type).toBe(fetchAccount.pending.type)
      expect(calls[1][0].type).toBe(showNotification.type)
      expect(calls[2][0].type).toBe(fetchAccount.fulfilled.type)
      expect(dispatch).toHaveBeenCalledWith(errorNotification)
    })
  })
})
