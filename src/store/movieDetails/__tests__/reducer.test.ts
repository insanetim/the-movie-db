import { assocPath, mergeDeepRight } from 'ramda'

import {
  changeMovieInFavorite,
  changeMovieInWatchlist,
  fetchMovieDetails,
} from '../actions'
import movieDetailsReducer, { movieDetailsInitialState } from '../reducer'

describe('movieDetailsReducer', () => {
  const state = movieDetailsInitialState

  it('should return initial state with empty action', () => {
    const result = movieDetailsReducer(undefined, { type: '' })

    expect(result).toEqual(state)
  })

  it('should handle "fetchMovieDetail/pending" action', () => {
    const action = {
      type: fetchMovieDetails.pending.type,
    }
    const result = movieDetailsReducer(state, action)

    expect(result).toEqual(state)
  })

  it('should handle "fetchMovieDetail/fulfilled" action', () => {
    const action = {
      payload: { data: 'test/data', id: '1234' },
      type: fetchMovieDetails.fulfilled.type,
    }
    const newState = mergeDeepRight(state, {
      entities: { '1234': { data: 'test/data', id: '1234' } },
      ids: ['1234'],
      loading: false,
    })
    const result = movieDetailsReducer(state, action)

    expect(result).toEqual(newState)
  })

  it('should handle "fetchMovieDetail/rejected" action', () => {
    const action = {
      payload: 'test/data',
      type: fetchMovieDetails.rejected.type,
    }
    const newState = mergeDeepRight(state, {
      error: action.payload,
      loading: false,
    })
    const result = movieDetailsReducer(state, action)

    expect(result).toEqual(newState)
  })

  it('should handle "changeMovieInFavorite/pending" action with movieId', () => {
    const action = {
      meta: { arg: { inFavorite: true, movieId: '1234' } },
      type: changeMovieInFavorite.pending.type,
    }
    const state = {
      entities: { '1234': { accountStates: { favorite: false }, id: '1234' } },
      ids: ['1234'],
    } as never
    const newState = assocPath(
      ['entities', '1234', 'accountStates', 'favorite'],
      true,
      state
    )
    const result = movieDetailsReducer(state, action)

    expect(result).toEqual(newState)
  })

  it('should handle "changeMovieInFavorite/pending" action without movieId', () => {
    const action = {
      meta: { arg: { inFavorite: true, movieId: '1234' } },
      type: changeMovieInFavorite.pending.type,
    }
    const result = movieDetailsReducer(state, action)

    expect(result).toEqual(state)
  })

  it('should handle "changeMovieInWatchlist/pending" action with movieId', () => {
    const action = {
      meta: { arg: { inWatchlist: true, movieId: '1234' } },
      type: changeMovieInWatchlist.pending.type,
    }
    const state = {
      entities: { '1234': { accountStates: { watchlist: false }, id: '1234' } },
      ids: ['1234'],
    } as never
    const newState = assocPath(
      ['entities', '1234', 'accountStates', 'watchlist'],
      true,
      state
    )
    const result = movieDetailsReducer(state, action)

    expect(result).toEqual(newState)
  })

  it('should handle "changeMovieInWatchlist/pending" action without movieId', () => {
    const action = {
      meta: { arg: { inWatchlist: true, movieId: '1234' } },
      type: changeMovieInWatchlist.pending.type,
    }
    const result = movieDetailsReducer(state, action)

    expect(result).toEqual(state)
  })
})
