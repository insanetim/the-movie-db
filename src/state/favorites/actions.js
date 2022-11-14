import * as types from './types'

export const fetchFavorites = (payload = 1) => ({
  type: types.FETCH_FAVORITES,
  payload
})

export const setFavorites = payload => ({
  type: types.SET_FAVORITES,
  payload
})
