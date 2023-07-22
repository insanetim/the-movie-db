import { fetchSearch, fetchTrending } from '../actions'
import reducer from '../reducer'
import { IDashboardState } from '../types'

describe('dashboardReducer', () => {
  const initialState: IDashboardState = { movies: null }

  it('returns initial state', () => {
    const action = { type: 'unknown' }

    expect(reducer(initialState, action)).toEqual(initialState)
  })

  it('should handle FETCH_TRENDING/pending', () => {
    const action = {
      type: fetchTrending.pending.toString()
    }
    const expectedState = { movies: null }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle FETCH_TRENDING/fulfilled', () => {
    const action = {
      payload: 'test/data',
      type: fetchTrending.fulfilled.toString()
    }
    const expectedState = { movies: action.payload }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle FETCH_SEARCH/pending', () => {
    const action = {
      type: fetchSearch.pending.toString()
    }
    const expectedState = { movies: null }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle FETCH_SEARCH/fulfilled', () => {
    const action = {
      payload: 'test/data',
      type: fetchSearch.fulfilled.toString()
    }
    const expectedState = { movies: action.payload }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })
})
