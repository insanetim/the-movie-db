import { mergeRight } from 'ramda'

import { fetchWatchlist } from '../actions'
import reducer from '../reducer'
import { WatchlistState } from '../types'

describe('watchlistReducer', () => {
  const initialState: WatchlistState = {
    data: null,
    error: null,
    loading: true
  }

  it('returns initial state', () => {
    const action = { type: 'unknown' }

    expect(reducer(initialState, action)).toEqual(initialState)
  })

  it('should handle fetchWatchlist/pending', () => {
    const action = {
      type: fetchWatchlist.pending.toString()
    }

    expect(reducer(initialState, action)).toEqual(initialState)
  })

  it('should handle fetchWatchlist/fulfilled', () => {
    const action = {
      payload: 'test/data',
      type: fetchWatchlist.fulfilled.toString()
    }
    const expectedState = mergeRight(initialState, {
      data: action.payload,
      loading: false
    })

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle fetchWatchlist/rejected', () => {
    const action = {
      payload: 'test/data',
      type: fetchWatchlist.rejected.toString()
    }
    const expectedState = mergeRight(initialState, {
      error: action.payload,
      loading: false
    })

    expect(reducer(initialState, action)).toEqual(expectedState)
  })
})
