import { changeMovieInFavorite, changeMovieInWatchlist, fetchMovie } from '../actions'
import reducer from '../reducer'

describe('movieReducer', () => {
  const initialState = { error: null, loading: true, movieDetail: null }

  it('returns initial state', () => {
    const action = { type: 'unknown' }

    expect(reducer(initialState, action)).toEqual(initialState)
  })

  it('should handle FETCH_MOVIE/pending', () => {
    const action = {
      type: fetchMovie.pending.toString()
    }
    const expectedState = { error: null, loading: true, movieDetail: null }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle FETCH_MOVIE/fulfilled', () => {
    const action = {
      payload: 'test/data',
      type: fetchMovie.fulfilled.toString()
    }
    const expectedState = { error: null, loading: false, movieDetail: 'test/data' }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle FETCH_MOVIE/rejected', () => {
    const action = {
      payload: 'test/error',
      type: fetchMovie.rejected.toString()
    }
    const expectedState = { error: 'test/error', loading: false, movieDetail: null }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle CHANGE_MOVIE_IN_FAVORITE/fulfilled with movieDetail', () => {
    const action = {
      meta: { arg: { inFavorite: true } },
      type: changeMovieInFavorite.fulfilled.toString()
    }
    const initialState = { error: null, loading: false, movieDetail: { accountStates: { favorite: false } } } as never
    const expectedState = { error: null, loading: false, movieDetail: { accountStates: { favorite: true } } }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle CHANGE_MOVIE_IN_FAVORITE/fulfilled without movieDetail', () => {
    const action = {
      meta: { arg: { inFavorite: true } },
      type: changeMovieInFavorite.fulfilled.toString()
    }
    const initialState = { error: null, loading: false, movieDetail: null } as never

    expect(reducer(initialState, action)).toEqual(initialState)
  })

  it('should handle CHANGE_MOVIE_IN_WATCHLIST/fulfilled with movieDetail', () => {
    const action = {
      meta: { arg: { inWatchlist: true } },
      type: changeMovieInWatchlist.fulfilled.toString()
    }
    const initialState = { error: null, loading: false, movieDetail: { accountStates: { watchlist: false } } } as never
    const expectedState = { error: null, loading: false, movieDetail: { accountStates: { watchlist: true } } }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle CHANGE_MOVIE_IN_WATCHLIST/fulfilled without movieDetail', () => {
    const action = {
      meta: { arg: { inWatchlist: true } },
      type: changeMovieInWatchlist.fulfilled.toString()
    }
    const initialState = { error: null, loading: false, movieDetail: null } as never

    expect(reducer(initialState, action)).toEqual(initialState)
  })
})
