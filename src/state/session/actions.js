import * as types from './types'

export const logIn = (payload, callback) => ({
  type: types.LOG_IN,
  payload,
  callback
})

export const logOut = callback => ({
  type: types.LOG_OUT,
  callback
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
