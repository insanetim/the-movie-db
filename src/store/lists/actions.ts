import { createAsyncThunk } from '@reduxjs/toolkit'
import { NOTIFICATION_TYPE } from 'src/constants/app'
import { IList, IListDetail, IListsList } from 'src/interfaces/list.interface'
import httpClient from 'src/libs/api/httpClient'
import * as routes from 'src/libs/apiRoutes'
import { showNotification } from 'src/store/app/actions'
import { accountSelector, sessionIdSelector } from 'src/store/session/selectors'
import errorMessage from 'src/utils/helpers/errorMessage'
import listMessage from 'src/utils/helpers/listMessage'

import { RootState } from '../index'
import { selectMovieById } from '../movie/selectors'
import * as types from './constants'
import { listsSelector } from './selectors'
import {
  AddToListProps,
  CreateListProps,
  CreateListResponse,
  FetchListDetailProps,
  RemoveFromListProps
} from './types'

const fetchLists = createAsyncThunk<
  IListsList,
  string,
  { rejectValue: string; state: RootState }
>(types.fetchLists, async function (page, { getState, rejectWithValue }) {
  const sessionId = sessionIdSelector(getState())
  const accountId = accountSelector(getState())!.id

  try {
    const { data } = await httpClient.request<IListsList>({
      params: { page, session_id: sessionId },
      url: routes.getCreatedLists(accountId)
    })

    return data
  } catch (error) {
    return rejectWithValue(errorMessage(error))
  }
})

const createList = createAsyncThunk<
  void,
  CreateListProps,
  { state: RootState }
>(
  types.createList,
  async function ({ listData, movieId }, { dispatch, getState }) {
    const sessionId = sessionIdSelector(getState())

    try {
      const { data } = await httpClient.request<CreateListResponse>({
        data: { ...listData },
        method: 'post',
        params: { session_id: sessionId },
        url: routes.createList
      })

      if (typeof movieId !== 'undefined') {
        dispatch(
          addToList({
            listId: data.list_id,
            movieId
          })
        )
      }
    } catch (error) {
      dispatch(
        showNotification({
          messageText: errorMessage(error),
          messageType: NOTIFICATION_TYPE.ERROR
        })
      )
    }
  }
)

const deleteList = createAsyncThunk<void, IList['id'], { state: RootState }>(
  types.deleteList,
  async function (listId, { dispatch, getState }) {
    const sessionId = sessionIdSelector(getState())

    try {
      await httpClient.request({
        method: 'delete',
        params: { session_id: sessionId },
        url: routes.deleteList(listId)
      })
    } catch (error) {
      dispatch(
        showNotification({
          messageText: errorMessage(error),
          messageType: NOTIFICATION_TYPE.ERROR
        })
      )
    }
  }
)

const fetchListDetail = createAsyncThunk<
  IListDetail,
  FetchListDetailProps,
  { rejectValue: string }
>(
  types.fetchListDetail,
  async function ({ listId, page }, { rejectWithValue }) {
    try {
      const { data } = await httpClient.request<IListDetail>({
        params: { page },
        url: routes.getListDetails(listId)
      })

      return data
    } catch (error) {
      return rejectWithValue(errorMessage(error))
    }
  }
)

const addToList = createAsyncThunk<void, AddToListProps, { state: RootState }>(
  types.addToList,
  async function ({ listId, movieId }, { dispatch, getState }) {
    const sessionId = sessionIdSelector(getState())

    try {
      await httpClient.request({
        data: { media_id: movieId },
        method: 'post',
        params: { session_id: sessionId },
        url: routes.addToList(listId)
      })

      await dispatch(fetchLists('1'))

      const movieTitle = selectMovieById(getState(), movieId)!.title
      const listName = listsSelector(getState())!.results.find(
        list => list.id === listId
      )!.name

      dispatch(
        showNotification({ messageText: listMessage(movieTitle, listName) })
      )
    } catch (error) {
      dispatch(
        showNotification({
          messageText: errorMessage(error),
          messageType: NOTIFICATION_TYPE.ERROR
        })
      )
    }
  }
)

const removeFromList = createAsyncThunk<
  void,
  RemoveFromListProps,
  { state: RootState }
>(
  types.removeFromList,
  async function ({ listId, movieId }, { dispatch, getState }) {
    const sessionId = sessionIdSelector(getState())

    try {
      await httpClient.request({
        data: { media_id: movieId },
        method: 'post',
        params: { session_id: sessionId },
        url: routes.removeFromList(listId)
      })
    } catch (error) {
      dispatch(
        showNotification({
          messageText: errorMessage(error),
          messageType: NOTIFICATION_TYPE.ERROR
        })
      )
    }
  }
)

export {
  addToList,
  createList,
  deleteList,
  fetchListDetail,
  fetchLists,
  removeFromList
}
