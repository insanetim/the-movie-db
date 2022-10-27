import * as types from './types'

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
