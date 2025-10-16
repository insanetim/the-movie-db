import {
  addMovieToList,
  createNewList,
  deleteMyList,
  getCreatedLists,
  removeMovieFromList,
} from 'src/api/tmdb/apiRoutes'
import { NOTIFICATION_TYPE } from 'src/constants/app'
import { IList } from 'src/interfaces/list.interface'
import errorMessage from 'src/utils/helpers/errorMessage'

import { showNotification } from '../features/app'
import { selectAccount, selectSessionId } from '../features/auth'
import { createAppAsyncThunk } from '../withTypes'
import * as types from './constants'
import { AddToListProps, CreateListProps, RemoveFromListProps } from './types'

const fetchLists = createAppAsyncThunk(
  types.fetchLists,
  async function (page: string, { getState, rejectWithValue }) {
    const sessionId = selectSessionId(getState())!
    const { id: accountId } = selectAccount(getState())!

    try {
      const lists = await getCreatedLists({ accountId, page, sessionId })

      return lists
    } catch (error) {
      return rejectWithValue(errorMessage(error))
    }
  }
)

const createList = createAppAsyncThunk(
  types.createList,
  async function (
    { listData, movieId }: CreateListProps,
    { dispatch, getState }
  ) {
    const sessionId = selectSessionId(getState())!
    const { name: listName } = listData

    try {
      const listId = await createNewList({ listData, sessionId })

      if (typeof movieId !== 'undefined') {
        dispatch(addToList({ listId, listName, movieId }))
      }
    } catch (error) {
      dispatch(
        showNotification({
          message: errorMessage(error),
          type: NOTIFICATION_TYPE.ERROR,
        })
      )
    }
  }
)

const deleteList = createAppAsyncThunk(
  types.deleteList,
  async function (listId: IList['id'], { dispatch, getState }) {
    const sessionId = selectSessionId(getState())!

    try {
      await deleteMyList({ listId, sessionId })
    } catch (error) {
      dispatch(
        showNotification({
          message: errorMessage(error),
          type: NOTIFICATION_TYPE.ERROR,
        })
      )
    }
  }
)

const addToList = createAppAsyncThunk(
  types.addToList,
  async function (
    { listId, listName, movieId }: AddToListProps,
    { dispatch, getState }
  ) {
    const sessionId = selectSessionId(getState())!
    // const { title: movieTitle } = movieDetailsSelector(getState(), movieId)

    try {
      await addMovieToList({ listId, movieId, sessionId })
      // dispatch(showNotification({ message: listMessage(movieTitle, listName) }))
      await dispatch(fetchLists('1'))
    } catch (error) {
      dispatch(
        showNotification({
          message: errorMessage(error),
          type: NOTIFICATION_TYPE.ERROR,
        })
      )
    }
  }
)

const removeFromList = createAppAsyncThunk(
  types.removeFromList,
  async function (
    { listId, movieId }: RemoveFromListProps,
    { dispatch, getState }
  ) {
    const sessionId = selectSessionId(getState())!

    try {
      await removeMovieFromList({ listId, movieId, sessionId })
    } catch (error) {
      dispatch(
        showNotification({
          message: errorMessage(error),
          type: NOTIFICATION_TYPE.ERROR,
        })
      )
    }
  }
)

export { addToList, createList, deleteList, fetchLists, removeFromList }
