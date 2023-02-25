import * as types from './types'

export const fetchFavorites = page => ({
  type: types.FETCH_FAVORITES,
  payload: page
})

export const fetchFavoritesRequest = page => ({
  type: types.FETCH_FAVORITES_REQUEST,
  payload: page
})

export const fetchFavoritesSuccess = movies => ({
  type: types.FETCH_FAVORITES_SUCCESS,
  payload: movies
})

export const fetchFavoritesFailure = error => ({
  type: types.FETCH_FAVORITES_FAILURE,
  payload: error
})

export const setFavoritesPage = page => ({
  type: types.SET_FAVORITES_PAGE,
  payload: page
})
