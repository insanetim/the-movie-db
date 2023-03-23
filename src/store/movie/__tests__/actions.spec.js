import * as actions from '../actions'
import * as types from '../types'

describe('movie actions', () => {
  it('fetchMovie', () => {
    const expectedAction = {
      type: types.FETCH_MOVIE,
      payload: 123
    }

    expect(actions.fetchMovie(123)).toEqual(expectedAction)
  })

  it('fetchMovieRequest', () => {
    const expectedAction = {
      type: types.FETCH_MOVIE_REQUEST
    }

    expect(actions.fetchMovieRequest()).toEqual(expectedAction)
  })

  it('fetchMovieSuccess', () => {
    const expectedAction = {
      type: types.FETCH_MOVIE_SUCCESS,
      payload: { id: 123 }
    }

    expect(actions.fetchMovieSuccess({ id: 123 })).toEqual(expectedAction)
  })

  it('fetchMovieFailure', () => {
    const expectedAction = {
      type: types.FETCH_MOVIE_FAILURE,
      payload: { message: 'test/error' }
    }

    expect(actions.fetchMovieFailure({ message: 'test/error' })).toEqual(expectedAction)
  })

  it('fetchMovieStates', () => {
    const expectedAction = {
      type: types.FETCH_MOVIE_STATES,
      payload: 123
    }

    expect(actions.fetchMovieStates(123)).toEqual(expectedAction)
  })

  it('updateMovieStates', () => {
    const expectedAction = {
      type: types.UPDATE_MOVIE_STATES,
      payload: { favorite: true, watchlist: true }
    }

    expect(actions.updateMovieStates({ favorite: true, watchlist: true })).toEqual(expectedAction)
  })

  it('changeMovieInFavorites', () => {
    const expectedAction = {
      type: types.CHANGE_MOVIE_IN_FAVORITES,
      payload: { movieId: 123, inFavorites: true }
    }

    expect(actions.changeMovieInFavorites({ movieId: 123, inFavorites: true })).toEqual(expectedAction)
  })

  it('changeMovieInWatchlist', () => {
    const expectedAction = {
      type: types.CHANGE_MOVIE_IN_WATCHLIST,
      payload: { movieId: 123, inWatchlist: true }
    }

    expect(actions.changeMovieInWatchlist({ movieId: 123, inWatchlist: true })).toEqual(expectedAction)
  })
})
