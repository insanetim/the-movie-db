import * as types from './types'

export const requestMovie = (payload, cb) => ({
  type: types.REQUEST_MOVIE,
  payload,
  cb
})

export const setMovie = payload => ({
  type: types.SET_MOVIE,
  payload
})

export const setMovieInFavorites = payload => ({
  type: types.SET_MOVIE_IN_FAVORITES,
  payload
})

export const setMovieInWatchlist = payload => ({
  type: types.SET_MOVIE_IN_WATCHLIST,
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
