import * as types from '../types'
import * as reducer from '../reducer'

describe('listsReducer', () => {
  describe('lists reducer', () => {
    it('returns initial state', () => {
      expect(reducer.lists(undefined, { type: 'unknown' })).toEqual({})
    })

    it('should handle SET_LISTS', () => {
      const action = {
        type: types.SET_LISTS,
        payload: {
          page: 1,
          results: [{ id: 123 }],
          total_pages: 1,
          total_results: 1
        }
      }
      expect(reducer.lists(undefined, action)).toEqual({
        page: 1,
        results: [{ id: 123 }],
        total_pages: 1,
        total_results: 1
      })
    })
  })

  describe('list reducer', () => {
    it('returns initial state', () => {
      expect(reducer.list(undefined, { type: 'unknown' })).toEqual({})
    })

    it('should handle SET_LIST', () => {
      const action = {
        type: types.SET_LIST,
        payload: {
          page: 1,
          results: [{ id: 123 }],
          total_pages: 1,
          total_results: 1
        }
      }
      expect(reducer.list(undefined, action)).toEqual({
        page: 1,
        results: [{ id: 123 }],
        total_pages: 1,
        total_results: 1
      })
    })
  })
})
