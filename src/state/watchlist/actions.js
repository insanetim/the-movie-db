import * as types from './types'

export const requestWatchlist = payload => ({
  type: types.REQUEST_WATCHLIST,
  payload
})

export const setWatchlist = payload => ({
  type: types.SET_WATCHLIST,
  payload
})
