import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  addMovieToList,
  createNewList,
  deleteMyList,
  getCreatedLists,
  removeMovieFromList,
} from 'src/api/tmdb/apiRoutes'
import { NOTIFICATION_TYPE } from 'src/constants/app'
import { IList, IListsList } from 'src/interfaces/list.interface'
import { RootState } from 'src/store'
import { showNotification } from 'src/store/app/actions'
import { accountSelector } from 'src/store/auth/selectors'
import errorMessage from 'src/utils/helpers/errorMessage'
import getSessionId from 'src/utils/helpers/getSessionId'
import listMessage from 'src/utils/helpers/listMessage'

import { movieDetailsSelector } from '../movieDetails/selectors'
import * as types from './constants'
import { AddToListProps, CreateListProps, RemoveFromListProps } from './types'

const fetchLists = createAsyncThunk<
  IListsList,
  string,
  { rejectValue: string; state: RootState }
>(types.fetchLists, async function (page, { getState, rejectWithValue }) {
  const sessionId = getSessionId()
  const accountId = accountSelector(getState())!.id

  try {
    const lists = await getCreatedLists({ accountId, page, sessionId })

    return lists
  } catch (error) {
    return rejectWithValue(errorMessage(error))
  }
})

const createList = createAsyncThunk<
  void,
  CreateListProps,
  { state: RootState }
>(types.createList, async function ({ listData, movieId }, { dispatch }) {
  const sessionId = getSessionId()
  const listName = listData.name

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
})

const deleteList = createAsyncThunk<void, IList['id'], { state: RootState }>(
  types.deleteList,
  async function (listId, { dispatch }) {
    const sessionId = getSessionId()

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

const addToList = createAsyncThunk<void, AddToListProps, { state: RootState }>(
  types.addToList,
  async function ({ listId, listName, movieId }, { dispatch, getState }) {
    const sessionId = getSessionId()
    const movieTitle = movieDetailsSelector(getState(), movieId)!.title

    try {
      await addMovieToList({ listId, movieId, sessionId })
      dispatch(showNotification({ message: listMessage(movieTitle, listName) }))
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

const removeFromList = createAsyncThunk<
  void,
  RemoveFromListProps,
  { state: RootState }
>(types.removeFromList, async function ({ listId, movieId }, { dispatch }) {
  const sessionId = getSessionId()

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
})

export { addToList, createList, deleteList, fetchLists, removeFromList }
