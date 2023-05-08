import reducer from '../reducer'
import { fetchFavorite } from '../actions'

describe('favoriteReducer', () => {
  const initialState = { movies: null, loading: true, error: null }

  it('returns initial state', () => {
    const action = { type: 'unknown' }

    expect(reducer(initialState, action)).toEqual(initialState)
  })

  it('should handle FETCH_FAVORITE/pending', () => {
    const action = {
      type: fetchFavorite.pending.toString()
    }
    const expectedState = { movies: null, loading: true, error: null }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle FETCH_FAVORITE/fulfilled', () => {
    const action = {
      type: fetchFavorite.fulfilled.toString(),
      payload: 'test/data'
    }
    const expectedState = { movies: 'test/data', loading: false, error: null }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle FETCH_FAVORITE/rejected', () => {
    const action = {
      type: fetchFavorite.rejected.toString(),
      payload: 'test/error'
    }
    const expectedState = { movies: null, loading: false, error: 'test/error' }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })
})
