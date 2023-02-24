import * as types from '../types'
import * as reducer from '../reducer'

describe('dashboardReducer', () => {
  describe('trending reducer', () => {
    it('returns initial state', () => {
      expect(reducer.trending(undefined, { type: 'unknown' })).toEqual({})
    })

    it('should handle SET_TRENDING', () => {
      const action = {
        type: types.SET_TRENDING,
        payload: { id: 123 }
      }
      expect(reducer.trending(undefined, action)).toEqual({ id: 123 })
    })
  })

  describe('search reducer', () => {
    it('returns initial state', () => {
      expect(reducer.search(undefined, { type: 'unknown' })).toEqual({})
    })

    it('should handle SET_SEARCH', () => {
      const action = {
        type: types.SET_SEARCH,
        payload: { id: 123 }
      }
      expect(reducer.search(undefined, action)).toEqual({ id: 123 })
    })

    it('should handle CLEAR_SEARCH', () => {
      const action = {
        type: types.CLEAR_SEARCH
      }
      expect(reducer.search(undefined, action)).toEqual({})
    })
  })
})
