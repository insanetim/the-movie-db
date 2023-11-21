import setState from 'src/utils/stateHelpers/setState'

import type { FavoriteState } from '../types'

import { fetchFavorite } from '../actions'
import favoriteReducer from '../reducer'

jest.mock('src/utils/stateHelpers/setState')

describe('favoriteReducer', () => {
  const state: FavoriteState = {
    data: null,
    error: null,
    loading: true
  }

  it('should return initial state with empty action', () => {
    const result = favoriteReducer(undefined, { type: '' })

    expect(result).toEqual(state)
  })

  it('should handle fetchFavorite/pending action', () => {
    const action = { type: fetchFavorite.pending }
    favoriteReducer(state, action)

    expect(setState.pending).toHaveBeenCalled()
  })

  it('should handle fetchFavorite/fulfilled action', () => {
    const action = {
      payload: 'test/data',
      type: fetchFavorite.fulfilled
    }
    favoriteReducer(state, action)

    expect(setState.fulfilled).toHaveBeenCalled()
  })

  it('should handle fetchFavorite/rejected action', () => {
    const action = {
      payload: 'test/error',
      type: fetchFavorite.rejected
    }
    favoriteReducer(state, action)

    expect(setState.rejected).toHaveBeenCalled()
  })
})
