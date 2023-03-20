import httpClient from 'src/api/httpClient'
import * as endpoints from 'src/constants/endpoints'
import { sessionIdSelector } from 'src/store/session/selectors'
import { showNotification } from 'src/store/app/actions'
import * as types from './types'

export const fetchLists = (page = 1) => ({
  type: types.FETCH_LISTS,
  payload: page
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

export const createList = ({ listData, movieId }) => ({
  type: types.CREATE_LIST,
  payload: { listData, movieId }
})

export const addToList = ({ listId, movieId }) => ({
  type: types.ADD_TO_LIST,
  payload: { listId, movieId }
})

export const removeFromList = ({ listId, movieId }) => ({
  type: types.REMOVE_FROM_LIST,
  payload: { listId, movieId }
})

export const deleteList = listId => async (dispatch, getState) => {
  const sessionId = sessionIdSelector(getState())
  let list

  try {
    list = await httpClient.get(endpoints.getListDetails(listId))
    await httpClient.delete(endpoints.deleteList(listId), { params: { session_id: sessionId } })
  } catch (error) {
    const errorMessage = `${list.data.name} list has been removed`
    dispatch(showNotification({ messageText: errorMessage }))
  } finally {
    dispatch(fetchLists())
  }
}
