import * as types from './types'

const initialState = {
  movie: {},
  movieInFavorites: null,
  movieInWatchlist: null
}

export default function movieReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_MOVIE:
      return { ...state, movie: action.payload }
    case types.SET_MOVIE_IN_FAVORITES:
      return { ...state, movieInFavorites: action.payload }
    case types.SET_MOVIE_IN_WATCHLIST:
      return { ...state, movieInWatchlist: action.payload }
    default:
      return state
  }
}
