import * as types from './types'

export const fetchWatchlist = page => ({
  type: types.FETCH_WATCHLIST,
  payload: page
})

export const fetchWatchlistRequest = page => ({
  type: types.FETCH_WATCHLIST_REQUEST,
  payload: page
})

export const fetchWatchlistSuccess = movies => ({
  type: types.FETCH_WATCHLIST_SUCCESS,
  payload: movies
})

export const fetchWatchlistFailure = error => ({
  type: types.FETCH_WATCHLIST_FAILURE,
  payload: error
})

export const setWatchlistPage = page => ({
  type: types.SET_WATCHLIST_PAGE,
  payload: page
})
