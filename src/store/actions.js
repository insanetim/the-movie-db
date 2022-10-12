const {
  LOG_IN,
  LOADING_ON,
  LOADING_OFF,
  SHOW_NOTIFICATION,
  SET_SESSION,
  LOG_OUT,
  REQUEST_ACCOUNT,
  REQUEST_TRENDING,
  REQUEST_SEARCH,
  CLEAR_SEARCH,
  SET_SEARCH_QUERY,
  SET_SEARCH_RESULT
} = require('./types')

export const loadingOn = () => ({
  type: LOADING_ON
})

export const loadingOff = () => ({
  type: LOADING_OFF
})

export const showNotification = payload => ({
  type: SHOW_NOTIFICATION,
  payload
})

export const login = (payload, cb) => ({
  type: LOG_IN,
  payload,
  cb
})

export const logout = cb => ({
  type: LOG_OUT,
  cb
})

export const setSession = payload => ({
  type: SET_SESSION,
  payload
})

export const requestAccount = () => ({
  type: REQUEST_ACCOUNT
})

export const requestTrending = payload => ({
  type: REQUEST_TRENDING,
  payload
})

export const requestSearch = payload => ({
  type: REQUEST_SEARCH,
  payload
})

export const setSearchQuery = payload => ({
  type: SET_SEARCH_QUERY,
  payload
})

export const setSearchResult = payload => ({
  type: SET_SEARCH_RESULT,
  payload
})

export const clearSearch = () => ({
  type: CLEAR_SEARCH
})
