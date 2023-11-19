import setState from 'src/utils/stateHelpers/setState'

import type { FavoriteState } from '../types'

import { fetchFavorite } from '../actions'
import favoriteReducer from '../reducer'

jest.mock('src/utils/stateHelpers/setState')

describe('favoriteReducer', () => {
  const initialState: FavoriteState = {
    data: null,
    error: null,
    loading: true
  }

  it('should handle fetchFavorite/pending', () => {
    const action = {
      type: fetchFavorite.pending.toString()
    }
    favoriteReducer(initialState, action)

    expect(setState.pending).toHaveBeenCalled()
  })

  it('should handle fetchFavorite/fulfilled', () => {
    const action = {
      payload: 'test/data',
      type: fetchFavorite.fulfilled.toString()
    }
    favoriteReducer(initialState, action)

    expect(setState.fulfilled).toHaveBeenCalled()
  })

  it('should handle fetchFavorite/rejected', () => {
    const action = {
      payload: 'test/error',
      type: fetchFavorite.rejected.toString()
    }
    favoriteReducer(initialState, action)

    expect(setState.rejected).toHaveBeenCalled()
  })
})
