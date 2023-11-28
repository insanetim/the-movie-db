import { assocPath } from 'ramda'

import {
  changeMovieInFavorite,
  changeMovieInWatchlist,
  fetchMovieDetail
} from '../actions'
import movieReducer, { movieInitialState } from '../reducer'

describe('movieReducer', () => {
  const state = movieInitialState

  it('should return initial state with empty action', () => {
    const result = movieReducer(undefined, { type: '' })

    expect(result).toEqual(state)
  })

  it('should handle "fetchMovieDetail/fulfilled" action', () => {
    const action = {
      payload: { data: 'test/data', id: '1234' },
      type: fetchMovieDetail.fulfilled.type
    }
    const newState = {
      entities: { '1234': { data: 'test/data', id: '1234' } },
      ids: ['1234']
    }
    const result = movieReducer(state, action)

    expect(result).toEqual(newState)
  })

  it('should handle "changeMovieInFavorite/pending" action with movieId', () => {
    const action = {
      meta: { arg: { inFavorite: true, movieId: '1234' } },
      type: changeMovieInFavorite.pending.type
    }
    const state = {
      entities: { '1234': { accountStates: { favorite: false }, id: '1234' } },
      ids: ['1234']
    } as never
    const newState = assocPath(
      ['entities', '1234', 'accountStates', 'favorite'],
      true,
      state
    )
    const result = movieReducer(state, action)

    expect(result).toEqual(newState)
  })

  it('should handle "changeMovieInFavorite/pending" action without movieId', () => {
    const action = {
      meta: { arg: { inFavorite: true, movieId: '1234' } },
      type: changeMovieInFavorite.pending.type
    }
    const result = movieReducer(state, action)

    expect(result).toEqual(state)
  })

  it('should handle "changeMovieInWatchlist/pending" action with movieId', () => {
    const action = {
      meta: { arg: { inWatchlist: true, movieId: '1234' } },
      type: changeMovieInWatchlist.pending.type
    }
    const state = {
      entities: { '1234': { accountStates: { watchlist: false }, id: '1234' } },
      ids: ['1234']
    } as never
    const newState = assocPath(
      ['entities', '1234', 'accountStates', 'watchlist'],
      true,
      state
    )
    const result = movieReducer(state, action)

    expect(result).toEqual(newState)
  })

  it('should handle "changeMovieInWatchlist/pending" action without movieId', () => {
    const action = {
      meta: { arg: { inWatchlist: true, movieId: '1234' } },
      type: changeMovieInWatchlist.pending.type
    }
    const result = movieReducer(state, action)

    expect(result).toEqual(state)
  })
})
