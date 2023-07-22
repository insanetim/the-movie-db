import { fetchFavorite } from '../actions'
import reducer from '../reducer'
import { IFavoriteState } from '../types'

describe('favoriteReducer', () => {
  const initialState: IFavoriteState = { movies: null }

  it('returns initial state', () => {
    const action = { type: 'unknown' }

    expect(reducer(initialState, action)).toEqual(initialState)
  })

  it('should handle FETCH_FAVORITE/pending', () => {
    const action = {
      type: fetchFavorite.pending.toString()
    }
    const expectedState = { movies: null }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle FETCH_FAVORITE/fulfilled', () => {
    const action = {
      payload: 'test/data',
      type: fetchFavorite.fulfilled.toString()
    }
    const expectedState = { movies: action.payload }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })
})
