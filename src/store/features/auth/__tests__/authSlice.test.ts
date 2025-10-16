import { authReducer, selectAccount, selectSessionId } from '../authSlice'

describe('authSlice', () => {
  const initialState = {
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
      const account = { id: 1, name: 'Test User' }
      const action = {
        meta: { arg: { endpointName: 'getAccount' } },
        payload: account,
        type: 'api/executeQuery/fulfilled',
      }

      const result = authReducer(initialState, action as never)

      expect(result).toEqual({ ...initialState, account })
    })

    it('should handle deleteSession.matchFulfilled', () => {
      const stateWithData = { account: { id: 1, name: 'Test' }, sessionId: 'sid' }
      const action = {
        meta: { arg: { endpointName: 'deleteSession' } },
        payload: { success: true },
        type: 'api/executeMutation/fulfilled',
      }

      const result = authReducer(stateWithData as never, action as never)

      expect(result).toEqual(initialState)
    })
  })

  describe('selectors', () => {
    it('should select account', () => {
      const root = { auth: initialState }
      expect(selectAccount(root as never)).toEqual(initialState.account)
    })

    it('should select sessionId', () => {
      const root = { auth: initialState }
      expect(selectSessionId(root as never)).toEqual(initialState.sessionId)
    })
  })
})

