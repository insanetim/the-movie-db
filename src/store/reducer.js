import * as types from './types'

const initialState = {
  sessionId: null,
  account: {},
  trending: {},
  search: {},
  movie: {},
  movieInFavorite: null,
  movieInWatchlist: null,
  lists: {},
  list: {},
  watchlist: {},
  favorites: {},
  modalType: null,
  modalProps: {},
  loading: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.LOADING_ON:
      return { ...state, loading: true }
    case types.LOADING_OFF:
      return { ...state, loading: false }
    case types.SHOW_MODAL:
      return { ...state, modalType: action.payload.modalType, modalProps: action.payload.modalProps }
    case types.HIDE_MODAL:
      return { ...state, modalProps: { open: false } }
    case types.SET_SESSION:
      return { ...state, sessionId: action.payload }
    case types.DELETE_SESSION:
      return { ...state, sessionId: null }
    case types.SET_ACCOUNT:
      return { ...state, account: action.payload }
    case types.SET_TRENDING:
      return { ...state, trending: action.payload }
    case types.SET_SEARCH:
      return { ...state, search: action.payload }
    case types.CLEAR_SEARCH:
      return { ...state, search: {} }
    case types.SET_LISTS:
      return { ...state, lists: action.payload }
    case types.SET_LIST:
      return { ...state, list: action.payload }
    case types.SET_WATCHLIST:
      return { ...state, watchlist: action.payload }
    case types.REQUEST_FAVORITES:
      return { ...state, favorites: action.payload }
    case types.SET_FAVORITES:
      return { ...state, favorites: action.payload }
    case types.SET_MOVIE:
      return { ...state, movie: action.payload }
    case types.SET_MOVIE_IN_FAVORITE:
      return { ...state, movieInFavorite: action.payload.inFavorite }
    case types.SET_MOVIE_IN_WATCHLIST:
      return { ...state, movieInWatchlist: action.payload.inWatchlist }
    default:
      return state
  }
}
