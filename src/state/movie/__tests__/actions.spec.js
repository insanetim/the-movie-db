import * as actions from '../actions'
import * as types from '../types'

const cb = jest.fn()

it('fetchMovie', () => {
  const expectedAction = {
    type: types.FETCH_MOVIE,
    payload: {},
    cb
  }

  expect(actions.fetchMovie({}, cb)).toEqual(expectedAction)
})

it('fetchMovieStates', () => {
  const expectedAction = {
    type: types.FETCH_MOVIE_STATES,
    payload: {}
  }

  expect(actions.fetchMovieStates({})).toEqual(expectedAction)
})

it('setMovie', () => {
  const expectedAction = {
    type: types.SET_MOVIE,
    payload: {}
  }

  expect(actions.setMovie({})).toEqual(expectedAction)
})

it('setMovieStates', () => {
  const expectedAction = {
    type: types.SET_MOVIE_STATES,
    payload: {}
  }

  expect(actions.setMovieStates({})).toEqual(expectedAction)
})

it('changeMovieInFavorites', () => {
  const expectedAction = {
    type: types.CHANGE_MOVIE_IN_FAVORITES,
    payload: {}
  }

  expect(actions.changeMovieInFavorites({})).toEqual(expectedAction)
})

it('changeMovieInWatchlist', () => {
  const expectedAction = {
    type: types.CHANGE_MOVIE_IN_WATCHLIST,
    payload: {}
  }

  expect(actions.changeMovieInWatchlist({})).toEqual(expectedAction)
})
