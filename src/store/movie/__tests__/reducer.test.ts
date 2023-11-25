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
      payload: { data: 'test/data', id: '123' },
      type: fetchMovieDetail.fulfilled.type
    }
    const newState = {
      entities: { '123': { data: 'test/data', id: '123' } },
      ids: ['123']
    }
    const result = movieReducer(state, action)

    expect(result).toEqual(newState)
  })

  it('should handle "changeMovieInFavorite/pending" action with movieId', () => {
    const action = {
      meta: { arg: { inFavorite: true, movieId: '123' } },
      type: changeMovieInFavorite.pending.type
    }
    const state = {
      entities: { '123': { accountStates: { favorite: false }, id: '123' } },
      ids: ['123']
    } as never
    const newState = assocPath(
      ['entities', '123', 'accountStates', 'favorite'],
      true,
      state
    )
    const result = movieReducer(state, action)

    expect(result).toEqual(newState)
  })

  it('should handle "changeMovieInFavorite/pending" action without movieId', () => {
    const action = {
      meta: { arg: { inFavorite: true, movieId: '123' } },
      type: changeMovieInFavorite.pending.type
    }
    const result = movieReducer(state, action)

    expect(result).toEqual(state)
  })

  it('should handle "changeMovieInWatchlist/pending" action with movieId', () => {
    const action = {
      meta: { arg: { inWatchlist: true, movieId: '123' } },
      type: changeMovieInWatchlist.pending.type
    }
    const state = {
      entities: { '123': { accountStates: { watchlist: false }, id: '123' } },
      ids: ['123']
    } as never
    const newState = assocPath(
      ['entities', '123', 'accountStates', 'watchlist'],
      true,
      state
    )
    const result = movieReducer(state, action)

    expect(result).toEqual(newState)
  })

  it('should handle "changeMovieInWatchlist/pending" action without movieId', () => {
    const action = {
      meta: { arg: { inWatchlist: true, movieId: '123' } },
      type: changeMovieInWatchlist.pending.type
    }
    const result = movieReducer(state, action)

    expect(result).toEqual(state)
  })
})
