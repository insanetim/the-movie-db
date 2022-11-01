import * as actions from '../actions'
import * as types from '../types'

const cb = jest.fn()

it('requestMovie', () => {
  const expectedAction = {
    type: types.REQUEST_MOVIE,
    payload: {},
    cb
  }

  expect(actions.requestMovie({}, cb)).toEqual(expectedAction)
})

it('setMovie', () => {
  const expectedAction = {
    type: types.SET_MOVIE,
    payload: {}
  }

  expect(actions.setMovie({})).toEqual(expectedAction)
})

it('setMovieInFavorites', () => {
  const expectedAction = {
    type: types.SET_MOVIE_IN_FAVORITES,
    payload: {}
  }

  expect(actions.setMovieInFavorites({})).toEqual(expectedAction)
})

it('setMovieInWatchlist', () => {
  const expectedAction = {
    type: types.SET_MOVIE_IN_WATCHLIST,
    payload: {}
  }

  expect(actions.setMovieInWatchlist({})).toEqual(expectedAction)
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
