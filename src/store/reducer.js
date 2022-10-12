import {
  CLEAR_SEARCH,
  LOADING_OFF,
  LOADING_ON,
  SET_ACCOUNT,
  SET_SEARCH_QUERY,
  SET_SEARCH_RESULT,
  SET_SESSION,
  SET_TRENDING
} from './types'

const initialState = {
  sessionId: '',
  account: {},
  trending: {},
  searchQuery: '',
  searchResult: {},
  loading: false
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_ON:
      return { ...state, loading: true }
    case LOADING_OFF:
      return { ...state, loading: false }
    case SET_SESSION:
      return { ...state, sessionId: action.payload }
    case SET_ACCOUNT:
      return { ...state, account: action.payload }
    case SET_TRENDING:
      return { ...state, trending: action.payload }
    case SET_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload }
    case SET_SEARCH_RESULT:
      return { ...state, searchResult: action.payload }
    case CLEAR_SEARCH:
      return { ...state, searchQuery: '', searchResult: {} }
    default:
      return state
  }
}
