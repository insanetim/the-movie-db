import * as types from './types'

export const fetchLists = ({ page, callback }) => ({
  type: types.FETCH_LISTS,
  payload: { page, callback }
})

export const fetchListsRequest = page => ({
  type: types.FETCH_LISTS_REQUEST,
  payload: page
})

export const fetchListsSuccess = movies => ({
  type: types.FETCH_LISTS_SUCCESS,
  payload: movies
})

export const fetchListsFailure = error => ({
  type: types.FETCH_LISTS_FAILURE,
  payload: error
})

export const setListsPage = page => ({
  type: types.SET_LISTS_PAGE,
  payload: page
})

export const fetchList = listId => ({
  type: types.FETCH_LIST,
  payload: listId
})

export const fetchListRequest = () => ({
  type: types.FETCH_LIST_REQUEST
})

export const fetchListSuccess = movies => ({
  type: types.FETCH_LIST_SUCCESS,
  payload: movies
})

export const fetchListFailure = error => ({
  type: types.FETCH_LIST_FAILURE,
  payload: error
})

export const createList = ({ value, callback }) => ({
  type: types.CREATE_LIST,
  payload: { value, callback }
})

export const addToList = ({ listId, movieId }) => ({
  type: types.ADD_TO_LIST,
  payload: { listId, movieId }
})

export const removeFromList = ({ listId, movieId }) => ({
  type: types.REMOVE_FROM_LIST,
  payload: { listId, movieId }
})

export const deleteList = ({ listId, callback }) => ({
  type: types.DELETE_LIST,
  payload: { listId, callback }
})
