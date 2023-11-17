import { assocPath } from 'ramda'

import {
  changeMovieInFavorite,
  changeMovieInWatchlist,
  fetchMovieDetail
} from '../actions'
import movieReducer, { movieInitialState } from '../reducer'

describe('movieReducer', () => {
  const initialState = movieInitialState

  it('returns initial state', () => {
    const action = { type: 'unknown' }

    expect(movieReducer(initialState, action)).toEqual(initialState)
  })

  it('should handle fetchMovieDetail/fulfilled', () => {
    const action = {
      payload: { data: 'test/data', id: '123' },
      type: fetchMovieDetail.fulfilled.toString()
    }
    const expectedState = {
      entities: { '123': { data: 'test/data', id: '123' } },
      ids: ['123']
    }

    expect(movieReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle changeMovieInFavorite/pending with movieId', () => {
    const action = {
      meta: { arg: { inFavorite: true, movieId: '123' } },
      type: changeMovieInFavorite.pending.toString()
    }
    const initialState = {
      entities: { '123': { accountStates: { favorite: false }, id: '123' } },
      ids: ['123']
    } as never
    const expectedState = assocPath(
      ['entities', '123', 'accountStates', 'favorite'],
      true,
      initialState
    )

    expect(movieReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle changeMovieInFavorite/pending without movieId', () => {
    const action = {
      meta: { arg: { inFavorite: true, movieId: '123' } },
      type: changeMovieInFavorite.pending.toString()
    }

    expect(movieReducer(initialState, action)).toEqual(initialState)
  })

  it('should handle changeMovieInWatchlist/pending with movieId', () => {
    const action = {
      meta: { arg: { inWatchlist: true, movieId: '123' } },
      type: changeMovieInWatchlist.pending.toString()
    }
    const initialState = {
      entities: { '123': { accountStates: { watchlist: false }, id: '123' } },
      ids: ['123']
    } as never
    const expectedState = assocPath(
      ['entities', '123', 'accountStates', 'watchlist'],
      true,
      initialState
    )

    expect(movieReducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle changeMovieInWatchlist/pending without movieId', () => {
    const action = {
      meta: { arg: { inWatchlist: true, movieId: '123' } },
      type: changeMovieInWatchlist.pending.toString()
    }

    expect(movieReducer(initialState, action)).toEqual(initialState)
  })
})
