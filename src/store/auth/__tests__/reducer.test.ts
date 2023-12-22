import { assoc } from 'ramda'

import { fetchAccount, logIn, logOut } from '../actions'
import authReducer from '../reducer'
import { SessionState } from '../types'

describe('authReducer', () => {
  const state: SessionState = {
    account: null,
    sessionId: '',
  }

  it('should return initial state with empty action', () => {
    const result = authReducer(undefined, { type: '' })

    expect(result).toEqual(state)
  })

  it('should handle "logIn/fulfilled" action', () => {
    const action = {
      payload: 'test/data',
      type: logIn.fulfilled.type,
    }
    const newState = assoc('sessionId', action.payload, state)
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
