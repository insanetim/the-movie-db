import * as types from './types'

const initialState = {
  sessionId: null,
  account: {},
  trending: {},
  searchQuery: null,
  searchResult: {},
  lists: {},
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
    case types.SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload }
    case types.SET_SEARCH_RESULT:
      return { ...state, searchResult: action.payload }
    case types.CLEAR_SEARCH:
      return { ...state, searchQuery: null, searchResult: {} }
    case types.SET_LISTS:
      return { ...state, lists: action.payload }
    case types.SET_WATCHLIST:
      return { ...state, watchlist: action.payload }
    case types.REQUEST_FAVORITES:
      return { ...state, favorites: action.payload }
    case types.SET_FAVORITES:
      return { ...state, favorites: action.payload }
    default:
      return state
  }
}
