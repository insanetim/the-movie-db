import * as types from '../types'
import reducer from '../reducer'

describe('favoritesReducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({})
  })

  it('should handle SET_FAVORITES', () => {
    const action = {
      type: types.SET_FAVORITES,
      payload: {
        page: 1,
        results: [{ id: 123 }],
        total_pages: 1,
        total_results: 1
      }
    }
    expect(reducer(undefined, action)).toEqual({
      page: 1,
      results: [{ id: 123 }],
      total_pages: 1,
      total_results: 1
    })
  })
})
