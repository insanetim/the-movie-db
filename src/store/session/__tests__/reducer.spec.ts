import { assoc } from 'ramda'

import { fetchAccount, logIn, logOut } from '../actions'
import reducer from '../reducer'
import { SessionState } from '../types'

describe('sessionReducer', () => {
  const initialState: SessionState = {
    account: null,
    loading: false,
    sessionId: ''
  }

  it('returns initial state', () => {
    const action = { type: 'unknown' }

    expect(reducer(initialState, action)).toEqual(initialState)
  })

  it('should handle logIn/pending', () => {
    const action = {
      type: logIn.pending.toString()
    }
    const expectedState = assoc('loading', true, initialState)

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle logIn/fulfilled', () => {
    const action = {
      payload: 'test/data',
      type: logIn.fulfilled.toString()
    }
    const expectedState = assoc('sessionId', action.payload, initialState)

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle logIn/rejected', () => {
    const action = {
      type: logIn.rejected.toString()
    }

    expect(reducer(initialState, action)).toEqual(initialState)
  })

  it('should handle logOut/fulfilled', () => {
    const action = {
      type: logOut.fulfilled.toString()
    }

    expect(reducer(initialState, action)).toEqual(initialState)
  })

  it('should handle fetchAccount/fulfilled', () => {
    const action = {
      payload: 'test/data',
      type: fetchAccount.fulfilled.toString()
    }
    const expectedState = assoc('account', action.payload, initialState)

    expect(reducer(initialState, action)).toEqual(expectedState)
  })
})
