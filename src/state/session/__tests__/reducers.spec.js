import * as types from '../types'
import reducer from '../reducers'

describe('sessionReducer', () => {
  it('should return initialState', () => {
    expect(reducer(undefined, {})).toEqual({
      sessionId: null,
      account: {}
    })
  })

  it('should handle SET_SESSION', () => {
    const action = {
      type: types.SET_SESSION,
      payload: 'test/session'
    }
    expect(reducer(undefined, action)).toEqual({
      sessionId: 'test/session',
      account: {}
    })
  })

  it('should handle DELETE_SESSION', () => {
    const action = {
      type: types.DELETE_SESSION
    }
    expect(reducer(undefined, action)).toEqual({
      sessionId: null,
      account: {}
    })
  })

  it('should handle SET_ACCOUNT', () => {
    const action = {
      type: types.SET_ACCOUNT,
      payload: { id: 1 }
    }
    expect(reducer(undefined, action)).toEqual({
      sessionId: null,
      account: { id: 1 }
    })
  })
})
