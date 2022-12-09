import * as types from '../types'
import * as reducer from '../reducer'

describe('sessionReducer', () => {
  describe('sessionId reducer', () => {
    it('returns initial state', () => {
      expect(reducer.sessionId(undefined, { type: 'unknown' })).toBe(null)
    })

    it('should handle SET_SESSION', () => {
      const action = {
        type: types.SET_SESSION,
        payload: 'test/sessionId'
      }
      expect(reducer.sessionId(undefined, action)).toBe('test/sessionId')
    })

    it('should handle DELETE_SESSION', () => {
      const action = {
        type: types.DELETE_SESSION
      }
      expect(reducer.sessionId(undefined, action)).toBe(null)
    })
  })

  describe('account reducer', () => {
    it('returns initial state', () => {
      expect(reducer.account(undefined, { type: 'unknown' })).toEqual({})
    })

    it('should handle SET_ACCOUNT', () => {
      const action = {
        type: types.SET_ACCOUNT,
        payload: { id: 123 }
      }
      expect(reducer.account(undefined, action)).toEqual({ id: 123 })
    })
  })
})
