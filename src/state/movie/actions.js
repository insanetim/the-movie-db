import * as types from './types'

export const fetchMovie = (payload, cb) => ({
  type: types.FETCH_MOVIE,
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
