import * as types from '../types'
import reducer from '../reducers'

describe('dashboardReducer', () => {
  it('should return initialState', () => {
    expect(reducer(undefined, {})).toEqual({
      trending: {},
      search: {},
      searchQuery: null
    })
  })

  it('should handle SET_TRENDING', () => {
    const action = {
      type: types.SET_TRENDING,
      payload: { id: 1 }
    }
    expect(reducer(undefined, action)).toEqual({
      trending: { id: 1 },
      search: {},
      searchQuery: null
    })
  })

  it('should handle SET_SEARCH', () => {
    const action = {
      type: types.SET_SEARCH,
      payload: { id: 1 }
    }
    expect(reducer(undefined, action)).toEqual({
      trending: {},
      search: { id: 1 },
      searchQuery: null
    })
  })

  it('should handle SET_SEARCH_QUERY', () => {
    const action = {
      type: types.SET_SEARCH_QUERY,
      payload: 'test/searchQuery'
    }
    expect(reducer(undefined, action)).toEqual({
      trending: {},
      search: {},
      searchQuery: 'test/searchQuery'
    })
  })

  it('should handle CLEAR_SEARCH', () => {
    const action = {
      type: types.CLEAR_SEARCH
    }
    expect(reducer(undefined, action)).toEqual({
      trending: {},
      search: {},
      searchQuery: null
    })
  })
})
