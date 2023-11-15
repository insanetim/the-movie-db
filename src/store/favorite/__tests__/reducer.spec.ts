import { fetchFavorite } from '../actions'
import reducer from '../reducer'
import { IFavoriteState } from '../types'

describe('favoriteReducer', () => {
  const initialState: IFavoriteState = {
    error: null,
    loading: true,
    movies: null
  }

  it('returns initial state', () => {
    const action = { type: 'unknown' }

    expect(reducer(initialState, action)).toEqual(initialState)
  })

  it('should handle FETCH_FAVORITE/pending', () => {
    const action = {
      type: fetchFavorite.pending.toString()
    }
    const expectedState = {
      error: null,
      loading: true,
      movies: null
    }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle FETCH_FAVORITE/fulfilled', () => {
    const action = {
      payload: 'test/data',
      type: fetchFavorite.fulfilled.toString()
    }
    const expectedState = {
      error: null,
      loading: false,
      movies: action.payload
    }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle FETCH_FAVORITE/rejected', () => {
    const action = {
      payload: 'test/data',
      type: fetchFavorite.rejected.toString()
    }
    const expectedState = {
      error: action.payload,
      loading: false,
      movies: null
    }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })
})
