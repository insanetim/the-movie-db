const { LOG_IN, LOADING_ON, LOADING_OFF, SHOW_NOTIFICATION, SET_SESSION, LOG_OUT } = require('./types')

export const loadingOn = () => ({
  type: LOADING_ON
})

export const loadingOff = () => ({
  type: LOADING_OFF
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

export const showNotification = payload => ({
  type: SHOW_NOTIFICATION,
  payload
})
