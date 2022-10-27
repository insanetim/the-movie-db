import * as types from './types'

export const requestFavorites = payload => ({
  type: types.REQUEST_FAVORITES,
  payload
})

export const setFavorites = payload => ({
  type: types.SET_FAVORITES,
  payload
})
