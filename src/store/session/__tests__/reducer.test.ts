import { assoc } from 'ramda'

import { fetchAccount, logIn, logOut } from '../actions'
import sessionReducer from '../reducer'
import { SessionState } from '../types'

describe('sessionReducer', () => {
  const state: SessionState = {
    account: null,
    loading: false,
    sessionId: ''
  }

  it('should return initial state with empty action', () => {
    const result = sessionReducer(undefined, { type: '' })

    expect(result).toEqual(state)
  })

  it('should handle logIn/pending action', () => {
    const action = { type: logIn.pending }
    const newState = assoc('loading', true, state)
    const result = sessionReducer(state, action)

    expect(result).toEqual(newState)
  })

  it('should handle logIn/fulfilled action', () => {
    const action = {
      payload: 'test/data',
      type: logIn.fulfilled
    }
    const newState = assoc('sessionId', action.payload, state)
    const result = sessionReducer(state, action)

    expect(result).toEqual(newState)
  })

  it('should handle logIn/rejected action', () => {
    const action = { type: logIn.rejected }
    const result = sessionReducer(state, action)

    expect(result).toEqual(state)
  })

  it('should handle logOut/fulfilled action', () => {
    const action = { type: logOut.fulfilled }
    const result = sessionReducer(state, action)

    expect(result).toEqual(state)
  })

  it('should handle fetchAccount/fulfilled action', () => {
    const action = {
      payload: 'test/data',
      type: fetchAccount.fulfilled
    }
    const newState = assoc('account', action.payload, state)
    const result = sessionReducer(state, action)

    expect(result).toEqual(newState)
  })
})
