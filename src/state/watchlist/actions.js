import * as types from './types'

export const fetchWatchlist = payload => ({
  type: types.FETCH_WATCHLIST,
  payload
})

export const setWatchlist = payload => ({
  type: types.SET_WATCHLIST,
  payload
})
