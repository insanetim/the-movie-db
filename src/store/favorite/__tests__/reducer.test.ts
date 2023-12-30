import { mergeDeepRight } from 'ramda'

import { fetchFavorite } from '../actions'
import favoriteReducer from '../reducer'
import { FavoriteState } from '../types'

describe('favoriteReducer', () => {
  const state: FavoriteState = {
    data: null,
    error: null,
    loading: true,
  }

  it('should return initial state with empty action', () => {
    const result = favoriteReducer(undefined, { type: '' })

    expect(result).toEqual(state)
  })

  it('should handle "fetchFavorite/pending" action', () => {
    const action = { type: fetchFavorite.pending.type }
    const result = favoriteReducer(state, action)

    expect(result).toEqual(state)
  })

  it('should handle "fetchFavorite/fulfilled" action', () => {
    const action = {
      payload: 'test/data',
      type: fetchFavorite.fulfilled.type,
    }
    const newState = mergeDeepRight(state, {
      data: action.payload,
      loading: false,
    })
    const result = favoriteReducer(state, action)

    expect(result).toEqual(newState)
  })

  it('should handle "fetchFavorite/rejected" action', () => {
    const action = {
      payload: 'test/error',
      type: fetchFavorite.rejected.type,
    }
    const newState = mergeDeepRight(state, {
      error: action.payload,
      loading: false,
    })
    const result = favoriteReducer(state, action)

    expect(result).toEqual(newState)
  })
})
