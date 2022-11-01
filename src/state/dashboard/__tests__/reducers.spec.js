import * as types from '../types'
import { trending, search } from '../reducers'

describe('dashboardReducer', () => {
  it('should handle SET_TRENDING', () => {
    const action = {
      type: types.SET_TRENDING,
      payload: { id: 1 }
    }
    expect(trending(undefined, action)).toEqual({ id: 1 })
  })

  it('should handle SET_SEARCH', () => {
    const action = {
      type: types.SET_SEARCH,
      payload: { id: 1 }
    }
    expect(search(undefined, action)).toEqual({
      search: { id: 1 },
      searchQuery: null
    })
  })

  it('should handle SET_SEARCH_QUERY', () => {
    const action = {
      type: types.SET_SEARCH_QUERY,
      payload: 'test/searchQuery'
    }
    expect(search(undefined, action)).toEqual({
      search: {},
      searchQuery: 'test/searchQuery'
    })
  })

  it('should handle CLEAR_SEARCH', () => {
    const action = {
      type: types.CLEAR_SEARCH
    }
    expect(search(undefined, action)).toEqual({
      search: {},
      searchQuery: null
    })
  })
})
