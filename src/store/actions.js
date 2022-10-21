import * as types from './types'

export const loadingOn = () => ({
  type: types.LOADING_ON
})

export const loadingOff = () => ({
  type: types.LOADING_OFF
})

export const showNotification = payload => ({
  type: types.SHOW_NOTIFICATION,
  payload
})

export const showModal = payload => ({
  type: types.SHOW_MODAL,
  payload
})

export const hideModal = () => ({
  type: types.HIDE_MODAL
})

export const login = (payload, cb) => ({
  type: types.LOG_IN,
  payload,
  cb
})

export const logout = cb => ({
  type: types.LOG_OUT,
  cb
})

export const setSession = payload => ({
  type: types.SET_SESSION,
  payload
})

export const deleteSession = () => ({
  type: types.DELETE_SESSION
})

export const setAccount = payload => ({
  type: types.SET_ACCOUNT,
  payload
})

export const requestAccount = () => ({
  type: types.REQUEST_ACCOUNT
})

export const requestTrending = payload => ({
  type: types.REQUEST_TRENDING,
  payload
})

export const setTrending = payload => ({
  type: types.SET_TRENDING,
  payload
})

export const requestSearch = payload => ({
  type: types.REQUEST_SEARCH,
  payload
})

export const setSearch = payload => ({
  type: types.SET_SEARCH,
  payload
})

export const clearSearch = () => ({
  type: types.CLEAR_SEARCH
})

export const requestLists = (payload, cb) => ({
  type: types.REQUEST_LISTS,
  payload,
  cb
})

export const setLists = payload => ({
  type: types.SET_LISTS,
  payload
})

export const requestList = (payload, cb) => ({
  type: types.REQUEST_LIST,
  payload,
  cb
})

export const setList = payload => ({
  type: types.SET_LIST,
  payload
})

export const createList = (payload, cb) => ({
  type: types.CREATE_LIST,
  payload,
  cb
})

export const addToList = payload => ({
  type: types.ADD_TO_LIST,
  payload
})

export const removeFromList = payload => ({
  type: types.REMOVE_FROM_LIST,
  payload
})

export const deleteList = (payload, cb) => ({
  type: types.DELETE_LIST,
  payload,
  cb
})

export const requestWatchlist = payload => ({
  type: types.REQUEST_WATCHLIST,
  payload
})

export const setWatchlist = payload => ({
  type: types.SET_WATCHLIST,
  payload
})

export const requestFavorites = payload => ({
  type: types.REQUEST_FAVORITES,
  payload
})

export const setFavorites = payload => ({
  type: types.SET_FAVORITES,
  payload
})

export const requestMovie = (payload, cb) => ({
  type: types.REQUEST_MOVIE,
  payload,
  cb
})

export const setMovie = payload => ({
  type: types.SET_MOVIE,
  payload
})

export const setMovieInFavorite = payload => ({
  type: types.SET_MOVIE_IN_FAVORITE,
  payload
})

export const changeMovieInFavorite = payload => ({
  type: types.CHANGE_MOVIE_IN_FAVORITE,
  payload
})

export const setMovieInWatchlist = payload => ({
  type: types.SET_MOVIE_IN_WATCHLIST,
  payload
})

export const changeMovieInWatchlist = payload => ({
  type: types.CHANGE_MOVIE_IN_WATCHLIST,
  payload
})
