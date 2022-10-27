import * as types from './types'

export const requestLists = (payload, cb) => ({
  type: types.REQUEST_LISTS,
  payload,
  cb
})

export const setLists = payload => ({
  type: types.SET_LISTS,
  payload
})

export const requestList = (payload, cb) => ({
  type: types.REQUEST_LIST,
  payload,
  cb
})

export const setList = payload => ({
  type: types.SET_LIST,
  payload
})

export const createList = (payload, cb) => ({
  type: types.CREATE_LIST,
  payload,
  cb
})

export const addToList = payload => ({
  type: types.ADD_TO_LIST,
  payload
})

export const removeFromList = payload => ({
  type: types.REMOVE_FROM_LIST,
  payload
})

export const deleteList = (payload, cb) => ({
  type: types.DELETE_LIST,
  payload,
  cb
})
