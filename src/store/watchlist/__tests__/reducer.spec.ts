import { fetchWatchlist } from '../actions'
import reducer from '../reducer'
import { IWatchlistState } from '../types'

describe('watchlistReducer', () => {
  const initialState: IWatchlistState = { movies: null }

  it('returns initial state', () => {
    const action = { type: 'unknown' }

    expect(reducer(initialState, action)).toEqual(initialState)
  })

  it('should handle FETCH_WATCHLIST/pending', () => {
    const action = {
      type: fetchWatchlist.pending.toString()
    }
    const expectedState = { movies: null }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle FETCH_WATCHLIST/fulfilled', () => {
    const action = {
      payload: 'test/data',
      type: fetchWatchlist.fulfilled.toString()
    }
    const expectedState = { movies: action.payload }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })
})
