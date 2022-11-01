import * as types from './types'

export const logIn = (payload, cb) => ({
  type: types.LOG_IN,
  payload,
  cb
})

export const logOut = cb => ({
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

export const fetchAccount = () => ({
  type: types.FETCH_ACCOUNT
})

export const setAccount = payload => ({
  type: types.SET_ACCOUNT,
  payload
})
