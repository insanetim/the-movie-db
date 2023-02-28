import * as types from './types'

export const logIn = ({ userData, callback }) => ({
  type: types.LOG_IN,
  payload: { userData, callback }
})

export const logOut = callback => ({
  type: types.LOG_OUT,
  payload: callback
})

export const setSession = sessionId => ({
  type: types.SET_SESSION,
  payload: sessionId
})

export const deleteSession = () => ({
  type: types.DELETE_SESSION
})

export const fetchAccount = () => ({
  type: types.FETCH_ACCOUNT
})

export const fetchAccountSuccess = account => ({
  type: types.FETCH_ACCOUNT_SUCCESS,
  payload: account
})

export const loadingOn = () => ({
  type: types.LOADING_ON
})

export const loadingOff = () => ({
  type: types.LOADING_OFF
})
