import { fetchAccount, logIn, logOut } from '../actions'
import reducer from '../reducer'

describe('sessionReducer', () => {
  const initialState = { account: null, loading: false, sessionId: '' }

  it('returns initial state', () => {
    const action = { type: 'unknown' }

    expect(reducer(initialState, action)).toEqual(initialState)
  })

  it('should handle LOG_IN/pending', () => {
    const action = {
      type: logIn.pending.toString()
    }
    const expectedState = { account: null, loading: true, sessionId: '' }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle LOG_IN/fulfilled', () => {
    const action = {
      payload: 'test/data',
      type: logIn.fulfilled.toString()
    }
    const expectedState = { account: null, loading: false, sessionId: 'test/data' }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle LOG_IN/rejected', () => {
    const action = {
      type: logIn.rejected.toString()
    }
    const expectedState = { account: null, loading: false, sessionId: '' }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle LOG_OUT/fulfilled', () => {
    const action = {
      type: logOut.fulfilled.toString()
    }
    const expectedState = { account: null, loading: false, sessionId: '' }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle FETCH_ACCOUNT/fulfilled', () => {
    const action = {
      payload: 'test/data',
      type: fetchAccount.fulfilled.toString()
    }
    const expectedState = { account: 'test/data', loading: false, sessionId: '' }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })
})
