import Cookies from 'js-cookie'
import mockAccount from 'src/__mocks__/mockAccount'
import { dispatch, getState } from 'src/__mocks__/react-redux'
import { NOTIFICATION_TYPE } from 'src/constants/app'
import * as apiRoutes from 'src/services/api/apiRoutes'
import { showNotification } from 'src/store/app/actions'

import { fetchAccount, logIn, logOut } from '../actions'

jest.mock<typeof import('@reduxjs/toolkit')>('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: () => 'test/id',
}))

const sessionId = 'test/session_id'
jest.mock('src/store/session/selectors', () => ({
  sessionIdSelector: () => sessionId,
}))

describe('session actions', () => {
  const cookiesSetSpy = jest.spyOn(Cookies, 'set')
  const cookiesRemoveSpy = jest.spyOn(Cookies, 'remove')
  const createRequestToken = jest.spyOn(apiRoutes, 'createRequestToken')
  const createSession = jest.spyOn(apiRoutes, 'createSession')
  const deleteSession = jest.spyOn(apiRoutes, 'deleteSession')
  const getAccountDetails = jest.spyOn(apiRoutes, 'getAccountDetails')
  const validateWithLogin = jest.spyOn(apiRoutes, 'validateWithLogin')
  const errorMessage = 'Something went wrong!'
  const errorNotification = showNotification({
    messageText: errorMessage,
    messageType: NOTIFICATION_TYPE.ERROR,
  })
  const userData = {
    password: 'test/password',
    username: 'test/username',
  }
  const requestToken = 'test/request_token'

  describe('logIn', () => {
    const thunk = logIn(userData)

    it('should handle success', async () => {
      createRequestToken.mockResolvedValueOnce(requestToken)
      validateWithLogin.mockResolvedValueOnce()
      createSession.mockResolvedValueOnce(sessionId)

      const result = await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(createRequestToken).toHaveBeenCalled()
      expect(validateWithLogin).toHaveBeenCalledWith({ requestToken, userData })
      expect(createSession).toHaveBeenCalledWith({ requestToken })
      expect(cookiesSetSpy).toHaveBeenCalledWith('tmdb.session_id', sessionId)
      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(logIn.pending.type)
      expect(calls[1][0].type).toBe(logIn.fulfilled.type)
      expect(result.payload).toEqual(sessionId)
    })

    it('should handle failure', async () => {
      createRequestToken.mockRejectedValueOnce(errorMessage)

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

    it('should handle success', async () => {
      deleteSession.mockResolvedValueOnce()

      await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(deleteSession).toHaveBeenCalledWith({ sessionId })
      expect(cookiesRemoveSpy).toHaveBeenCalledWith('tmdb.session_id')
      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(logOut.pending.type)
      expect(calls[1][0].type).toBe(logOut.fulfilled.type)
    })

    it('should handle failure', async () => {
      deleteSession.mockRejectedValueOnce(errorMessage)

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

    it('should handle success', async () => {
      getAccountDetails.mockResolvedValueOnce(mockAccount)

      const result = await thunk(dispatch, getState, undefined)
      const { calls } = dispatch.mock

      expect(getAccountDetails).toHaveBeenCalledWith({ sessionId })
      expect(calls).toHaveLength(2)
      expect(calls[0][0].type).toBe(fetchAccount.pending.type)
      expect(calls[1][0].type).toBe(fetchAccount.fulfilled.type)
      expect(result.payload).toEqual(mockAccount)
    })

    it('should handle failure', async () => {
      getAccountDetails.mockRejectedValueOnce(errorMessage)

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
