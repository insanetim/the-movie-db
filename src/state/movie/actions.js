import * as types from './types'

export const fetchMovie = movieId => ({
  type: types.FETCH_MOVIE,
  payload: movieId
})

export const fetchMovieRequest = () => ({
  type: types.FETCH_MOVIE_REQUEST
})

export const fetchMovieSuccess = movie => ({
  type: types.FETCH_MOVIE_SUCCESS,
  payload: movie
})

export const fetchMovieFailure = error => ({
  type: types.FETCH_MOVIE_FAILURE,
  payload: error
})

export const fetchMovieStates = movieId => ({
  type: types.FETCH_MOVIE_STATES,
  payload: movieId
})

export const updateMovieStates = movieStates => ({
  type: types.UPDATE_MOVIE_STATES,
  payload: movieStates
})

export const changeMovieInFavorites = ({ movieId, inFavorites }) => ({
  type: types.CHANGE_MOVIE_IN_FAVORITES,
  payload: { movieId, inFavorites }
})

export const changeMovieInWatchlist = ({ movieId, inWatchlist }) => ({
  type: types.CHANGE_MOVIE_IN_WATCHLIST,
  payload: { movieId, inWatchlist }
})
