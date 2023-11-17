import { mergeRight } from 'ramda'

import type { FavoriteState } from '../types'

import { fetchFavorite } from '../actions'
import favoriteReducer from '../reducer'

describe('favoriteReducer', () => {
  const initialState: FavoriteState = {
    data: null,
    error: null,
    loading: true
  }

  it('returns initial state', () => {
    const action = { type: 'unknown' }

    expect(favoriteReducer(initialState, action)).toEqual(initialState)
  })

  it('should handle fetchFavorite/pending', () => {
    const action = {
      type: fetchFavorite.pending.toString()
    }

    expect(favoriteReducer(initialState, action)).toEqual(initialState)
  })

  it('should handle fetchFavorite/fulfilled', () => {
    const action = {
      payload: 'test/data',
      type: fetchFavorite.fulfilled.toString()
    }
    const expectedState = mergeRight(initialState, {
      data: action.payload,
      loading: false
    })

    expect(favoriteReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle fetchFavorite/rejected', () => {
    const action = {
      payload: 'test/error',
      type: fetchFavorite.rejected.toString()
    }
    const expectedState = mergeRight(initialState, {
      error: action.payload,
      loading: false
    })

    expect(favoriteReducer(initialState, action)).toEqual(expectedState)
  })
})
