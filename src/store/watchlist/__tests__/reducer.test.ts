import setState from 'src/utils/stateHelpers/setState'

import type { WatchlistState } from '../types'

import { fetchWatchlist } from '../actions'
import watchlistReducer from '../reducer'

jest.mock('src/utils/stateHelpers/setState')

describe('watchlistReducer', () => {
  const initialState: WatchlistState = {
    data: null,
    error: null,
    loading: true
  }

  it('should handle fetchWatchlist/pending', () => {
    const action = {
      type: fetchWatchlist.pending.toString()
    }
    watchlistReducer(initialState, action)

    expect(setState.pending).toHaveBeenCalled()
  })

  it('should handle fetchWatchlist/fulfilled', () => {
    const action = {
      payload: 'test/data',
      type: fetchWatchlist.fulfilled.toString()
    }
    watchlistReducer(initialState, action)

    expect(setState.fulfilled).toHaveBeenCalled()
  })

  it('should handle fetchWatchlist/rejected', () => {
    const action = {
      payload: 'test/data',
      type: fetchWatchlist.rejected.toString()
    }
    watchlistReducer(initialState, action)

    expect(setState.rejected).toHaveBeenCalled()
  })
})
