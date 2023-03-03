import * as types from '../types'
import reducer from '../reducer'

describe('sessionReducer', () => {
  const initialState = { sessionId: null, account: {}, loading: false }

  it('returns initial state', () => {
    const action = { type: 'unknown' }

    expect(reducer(undefined, action)).toEqual(initialState)
  })

  it('should handle SET_SESSION', () => {
    const action = {
      type: types.SET_SESSION,
      payload: 'test/sessionId'
    }
    const expectedState = { sessionId: 'test/sessionId', account: {}, loading: false }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle DELETE_SESSION', () => {
    const action = {
      type: types.DELETE_SESSION
    }
    const expectedState = { sessionId: null, account: {}, loading: false }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle FETCH_ACCOUNT_SUCCESS', () => {
    const action = {
      type: types.FETCH_ACCOUNT_SUCCESS,
      payload: { id: 123 }
    }
    const expectedState = { sessionId: null, account: { id: 123 }, loading: false }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle LOADING_ON', () => {
    const action = {
      type: types.LOADING_ON
    }
    const expectedState = { sessionId: null, account: {}, loading: true }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle LOADING_OFF', () => {
    const action = {
      type: types.LOADING_OFF
    }
    const expectedState = { sessionId: null, account: {}, loading: false }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })
})
