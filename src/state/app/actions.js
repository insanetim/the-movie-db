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
