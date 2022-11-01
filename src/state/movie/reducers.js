import { combineReducers } from 'redux'

import * as types from './types'

export const movie = (state = {}, action) => {
  switch (action.type) {
    case types.SET_MOVIE:
      return action.payload
    default:
      return state
  }
}

export const movieInFavorites = (state = null, action) => {
  switch (action.type) {
    case types.SET_MOVIE_IN_FAVORITES:
      return action.payload
    default:
      return state
  }
}

export const movieInWatchlist = (state = null, action) => {
  switch (action.type) {
    case types.SET_MOVIE_IN_WATCHLIST:
      return action.payload
    default:
      return state
  }
}

const movieReducer = combineReducers({ movie, movieInFavorites, movieInWatchlist })

export default movieReducer
