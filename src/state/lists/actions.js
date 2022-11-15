import * as types from './types'

export const fetchLists = (payload, callback) => ({
  type: types.FETCH_LISTS,
  payload,
  callback
})

export const setLists = payload => ({
  type: types.SET_LISTS,
  payload
})

export const fetchList = (payload, callback) => ({
  type: types.FETCH_LIST,
  payload,
  callback
})

export const setList = payload => ({
  type: types.SET_LIST,
  payload
})

export const createList = (payload, callback) => ({
  type: types.CREATE_LIST,
  payload,
  callback
})

export const addToList = payload => ({
  type: types.ADD_TO_LIST,
  payload
})

export const removeFromList = payload => ({
  type: types.REMOVE_FROM_LIST,
  payload
})

export const deleteList = (payload, callback) => ({
  type: types.DELETE_LIST,
  payload,
  callback
})
