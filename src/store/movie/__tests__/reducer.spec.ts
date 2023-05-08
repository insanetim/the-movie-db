import reducer from '../reducer'
import { changeMovieInFavorite, changeMovieInWatchlist, fetchMovie } from '../actions'

describe('movieReducer', () => {
  const initialState = { movieDetail: null, loading: true, error: null }

  it('returns initial state', () => {
    const action = { type: 'unknown' }

    expect(reducer(initialState, action)).toEqual(initialState)
  })

  it('should handle FETCH_MOVIE/pending', () => {
    const action = {
      type: fetchMovie.pending.toString()
    }
    const expectedState = { movieDetail: null, loading: true, error: null }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle FETCH_MOVIE/fulfilled', () => {
    const action = {
      type: fetchMovie.fulfilled.toString(),
      payload: 'test/data'
    }
    const expectedState = { movieDetail: 'test/data', loading: false, error: null }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle FETCH_MOVIE/rejected', () => {
    const action = {
      type: fetchMovie.rejected.toString(),
      payload: 'test/error'
    }
    const expectedState = { movieDetail: null, loading: false, error: 'test/error' }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle CHANGE_MOVIE_IN_FAVORITE/fulfilled with movieDetail', () => {
    const action = {
      type: changeMovieInFavorite.fulfilled.toString(),
      meta: { arg: { inFavorite: true } }
    }
    const initialState = { movieDetail: { accountStates: { favorite: false } }, loading: false, error: null } as never
    const expectedState = { movieDetail: { accountStates: { favorite: true } }, loading: false, error: null }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle CHANGE_MOVIE_IN_FAVORITE/fulfilled without movieDetail', () => {
    const action = {
      type: changeMovieInFavorite.fulfilled.toString(),
      meta: { arg: { inFavorite: true } }
    }
    const initialState = { movieDetail: null, loading: false, error: null } as never

    expect(reducer(initialState, action)).toEqual(initialState)
  })

  it('should handle CHANGE_MOVIE_IN_WATCHLIST/fulfilled with movieDetail', () => {
    const action = {
      type: changeMovieInWatchlist.fulfilled.toString(),
      meta: { arg: { inWatchlist: true } }
    }
    const initialState = { movieDetail: { accountStates: { watchlist: false } }, loading: false, error: null } as never
    const expectedState = { movieDetail: { accountStates: { watchlist: true } }, loading: false, error: null }

    expect(reducer(initialState, action)).toEqual(expectedState)
  })

  it('should handle CHANGE_MOVIE_IN_WATCHLIST/fulfilled without movieDetail', () => {
    const action = {
      type: changeMovieInWatchlist.fulfilled.toString(),
      meta: { arg: { inWatchlist: true } }
    }
    const initialState = { movieDetail: null, loading: false, error: null } as never

    expect(reducer(initialState, action)).toEqual(initialState)
  })
})
