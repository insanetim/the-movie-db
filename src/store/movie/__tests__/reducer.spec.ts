import {
  changeMovieInFavorite,
  changeMovieInWatchlist,
  fetchMovieDetail
} from '../actions'
import reducer, { movieInitialState } from '../reducer'

describe('movieReducer', () => {
  const initialState = movieInitialState

  it('returns initial state', () => {
    const action = { type: 'unknown' }

    expect(reducer(initialState, action)).toEqual(initialState)
  })

  it('should handle FETCH_MOVIE/fulfilled', () => {
    const action = {
      payload: { data: 'test/data', id: '123' },
      type: fetchMovieDetail.fulfilled.toString()
    }
    const expectedState = {
      entities: { '123': { data: 'test/data', id: '123' } },
      ids: ['123']
    }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle CHANGE_MOVIE_IN_FAVORITE/pending with movieId', () => {
    const action = {
      meta: { arg: { inFavorite: true, movieId: '123' } },
      type: changeMovieInFavorite.pending.toString()
    }
    const initialState = {
      entities: { '123': { accountStates: { favorite: false }, id: '123' } },
      ids: ['123']
    } as never
    const expectedState = {
      entities: { '123': { accountStates: { favorite: true }, id: '123' } },
      ids: ['123']
    }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle CHANGE_MOVIE_IN_FAVORITE/pending without movieId', () => {
    const action = {
      meta: { arg: { inFavorite: true, movieId: '123' } },
      type: changeMovieInFavorite.pending.toString()
    }

    expect(reducer(initialState, action)).toEqual(initialState)
  })

  it('should handle CHANGE_MOVIE_IN_WATCHLIST/pending with movieId', () => {
    const action = {
      meta: { arg: { inWatchlist: true, movieId: '123' } },
      type: changeMovieInWatchlist.pending.toString()
    }
    const initialState = {
      entities: { '123': { accountStates: { watchlist: false }, id: '123' } },
      ids: ['123']
    } as never
    const expectedState = {
      entities: { '123': { accountStates: { watchlist: true }, id: '123' } },
      ids: ['123']
    }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle CHANGE_MOVIE_IN_WATCHLIST/pending without movieId', () => {
    const action = {
      meta: { arg: { inWatchlist: true, movieId: '123' } },
      type: changeMovieInWatchlist.pending.toString()
    }

    expect(reducer(initialState, action)).toEqual(initialState)
  })
})
