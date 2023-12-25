import { assoc } from 'ramda'

import { fetchAccount, logIn, logOut } from '../actions'
import authReducer from '../reducer'
import { AuthState } from '../types'

describe('authReducer', () => {
  const state: AuthState = {
    account: null,
    isAuthenticated: false,
  }

  it('should return initial state with empty action', () => {
    const result = authReducer(undefined, { type: '' })

    expect(result).toEqual(state)
  })

  it('should handle "logIn/fulfilled" action', () => {
    const action = {
      payload: 'test/session_id',
      type: logIn.fulfilled.type,
    }
    const newState = assoc('isAuthenticated', true, state)
    const result = authReducer(state, action)

    expect(result).toEqual(newState)
  })

  it('should handle "logOut/fulfilled" action', () => {
    const action = { type: logOut.fulfilled.type }
    const result = authReducer(state, action)

    expect(result).toEqual(state)
  })

  it('should handle "fetchAccount/fulfilled" action', () => {
    const action = {
      payload: 'test/data',
      type: fetchAccount.fulfilled.type,
    }
    const newState = assoc('account', action.payload, state)
    const result = authReducer(state, action)

    expect(result).toEqual(newState)
  })
})
