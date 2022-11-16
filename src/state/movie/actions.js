import * as types from './types'

export const fetchMovie = (payload, callback) => ({
  type: types.FETCH_MOVIE,
  payload,
  callback
})

export const fetchMovieStates = payload => ({
  type: types.FETCH_MOVIE_STATES,
  payload
})

export const setMovie = payload => ({
  type: types.SET_MOVIE,
  payload
})

export const setMovieStates = payload => ({
  type: types.SET_MOVIE_STATES,
  payload
})

export const changeMovieInFavorites = payload => ({
  type: types.CHANGE_MOVIE_IN_FAVORITES,
  payload
})

export const changeMovieInWatchlist = payload => ({
  type: types.CHANGE_MOVIE_IN_WATCHLIST,
  payload
})
