import reducer from '../reducer'
import { fetchAccount, logIn, logOut } from '../actions'

describe('sessionReducer', () => {
  const initialState = { sessionId: '', account: null, loading: false }

  it('returns initial state', () => {
    const action = { type: 'unknown' }

    expect(reducer(initialState, action)).toEqual(initialState)
  })

  it('should handle LOG_IN/pending', () => {
    const action = {
      type: logIn.pending.toString()
    }
    const expectedState = { sessionId: '', account: null, loading: true }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle LOG_IN/fulfilled', () => {
    const action = {
      type: logIn.fulfilled.toString(),
      payload: 'test/data'
    }
    const expectedState = { sessionId: 'test/data', account: null, loading: false }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle LOG_IN/rejected', () => {
    const action = {
      type: logIn.rejected.toString()
    }
    const expectedState = { sessionId: '', account: null, loading: false }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle LOG_OUT/fulfilled', () => {
    const action = {
      type: logOut.fulfilled.toString()
    }
    const expectedState = { sessionId: '', account: null, loading: false }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle FETCH_ACCOUNT/fulfilled', () => {
    const action = {
      type: fetchAccount.fulfilled.toString(),
      payload: 'test/data'
    }
    const expectedState = { sessionId: '', account: 'test/data', loading: false }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })
})
