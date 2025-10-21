import { authReducer, selectAccount, selectSessionId } from '../authSlice'
import { AuthState } from '../types'

describe('authSlice', () => {
  const initialState: AuthState = {
    account: null,
    sessionId: null,
  }

  describe('reducer', () => {
    it('should return initial state with empty action', () => {
      const result = authReducer(undefined, { type: '' })

      expect(result).toEqual(initialState)
    })

    it('should handle createSession.matchFulfilled', () => {
      const action = {
        meta: { arg: { endpointName: 'createSession' } },
        payload: { session_id: 'test/session' },
        type: 'api/executeMutation/fulfilled',
      }

      const result = authReducer(initialState, action as never)

      expect(result).toEqual({ ...initialState, sessionId: 'test/session' })
    })

    it('should handle getAccount.matchFulfilled', () => {
      const account = {
        avatar: { gravatar: { hash: 'hash' }, tmdb: { avatar_path: null } },
        id: 1,
        include_adult: false,
        iso_639_1: 'en',
        iso_3166_1: 'US',
        name: 'Test User',
        username: 'testuser',
      }
      const action = {
        meta: { arg: { endpointName: 'getAccount' } },
        payload: account,
        type: 'api/executeQuery/fulfilled',
      }

      const result = authReducer(initialState, action as never)

      expect(result).toEqual({ ...initialState, account })
    })

    it('should handle deleteSession.matchFulfilled', () => {
      const stateWithData: AuthState = {
        account: {
          avatar: { gravatar: { hash: 'hash' }, tmdb: { avatar_path: null } },
          id: 1,
          include_adult: false,
          iso_639_1: 'en',
          iso_3166_1: 'US',
          name: 'Test',
          username: 'testuser',
        },
        sessionId: 'sid',
      }
      const action = {
        meta: { arg: { endpointName: 'deleteSession' } },
        payload: { success: true },
        type: 'api/executeMutation/fulfilled',
      }

      const result = authReducer(stateWithData, action as never)

      expect(result).toEqual(initialState)
    })
  })

  describe('selectors', () => {
    it('should select account', () => {
      const root = { auth: initialState }
      expect(selectAccount(root)).toEqual(initialState.account)
    })

    it('should select sessionId', () => {
      const root = { auth: initialState }
      expect(selectSessionId(root)).toEqual(initialState.sessionId)
    })
  })
})
