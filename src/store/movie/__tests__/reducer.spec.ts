import { changeMovieInFavorite, changeMovieInWatchlist, fetchMovie } from '../actions'
import reducer from '../reducer'
import { IMovieState } from '../types'

describe('movieReducer', () => {
  const initialState: IMovieState = { movieDetail: null }

  it('returns initial state', () => {
    const action = { type: 'unknown' }

    expect(reducer(initialState, action)).toEqual(initialState)
  })

  it('should handle FETCH_MOVIE/pending', () => {
    const action = {
      type: fetchMovie.pending.toString()
    }
    const expectedState = { movieDetail: null }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle FETCH_MOVIE/fulfilled', () => {
    const action = {
      payload: 'test/data',
      type: fetchMovie.fulfilled.toString()
    }
    const expectedState = { movieDetail: action.payload }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle CHANGE_MOVIE_IN_FAVORITE/fulfilled with movieDetail', () => {
    const action = {
      meta: { arg: { inFavorite: true } },
      type: changeMovieInFavorite.fulfilled.toString()
    }
    const initialState = { movieDetail: { accountStates: { favorite: false } } } as IMovieState
    const expectedState = { movieDetail: { accountStates: { favorite: true } } }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle CHANGE_MOVIE_IN_FAVORITE/fulfilled without movieDetail', () => {
    const action = {
      meta: { arg: { inFavorite: true } },
      type: changeMovieInFavorite.fulfilled.toString()
    }

    expect(reducer(initialState, action)).toEqual(initialState)
  })

  it('should handle CHANGE_MOVIE_IN_WATCHLIST/fulfilled with movieDetail', () => {
    const action = {
      meta: { arg: { inWatchlist: true } },
      type: changeMovieInWatchlist.fulfilled.toString()
    }
    const initialState = { movieDetail: { accountStates: { watchlist: false } } } as IMovieState
    const expectedState = { movieDetail: { accountStates: { watchlist: true } } }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle CHANGE_MOVIE_IN_WATCHLIST/fulfilled without movieDetail', () => {
    const action = {
      meta: { arg: { inWatchlist: true } },
      type: changeMovieInWatchlist.fulfilled.toString()
    }

    expect(reducer(initialState, action)).toEqual(initialState)
  })
})
