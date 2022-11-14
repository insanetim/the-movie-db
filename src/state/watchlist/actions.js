import * as types from './types'

export const fetchWatchlist = (payload = 1) => ({
  type: types.FETCH_WATCHLIST,
  payload
})

export const setWatchlist = payload => ({
  type: types.SET_WATCHLIST,
  payload
})
