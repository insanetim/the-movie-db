import type { IAccount } from 'src/interfaces/account.interface'
import type {
  IList,
  IListDetail,
  IListsList
} from 'src/interfaces/list.interface'

import { createAsyncThunk } from '@reduxjs/toolkit'
import { NOTIFICATION_TYPE } from 'src/constants/app'
import httpClient from 'src/lib/api/httpClient'
import * as routes from 'src/lib/apiRoutes'
import { showNotification } from 'src/store/app/actions'
import { accountSelector, sessionIdSelector } from 'src/store/session/selectors'
import errorMessage from 'src/utils/helpers/errorMessage'
import listMessage from 'src/utils/helpers/listMessage'

import type { RootState } from '../index'
import type {
  AddToListProps,
  CreateListProps,
  CreateListResponse,
  RemoveFromListProps,
  fetchListDetailProps
} from './types'

import { selectMovieById } from '../movie/selectors'
import * as types from './constants'
import { listsSelector } from './selectors'

const fetchLists = createAsyncThunk(
  types.FETCH_LISTS,
  async (page: string, { getState, rejectWithValue }) => {
    const sessionId = sessionIdSelector(getState() as RootState)
    const { id: accountId } = accountSelector(
      getState() as RootState
    ) as IAccount

    try {
      const { data } = await httpClient.request<IListsList>({
        params: { page, session_id: sessionId },
        url: routes.getCreatedLists(accountId)
      })

      return data
    } catch (error) {
      return rejectWithValue(errorMessage(error))
    }
  }
)

const createList = createAsyncThunk(
  types.CREATE_LIST,
  async ({ listData, movieId }: CreateListProps, { dispatch, getState }) => {
    const sessionId = sessionIdSelector(getState() as RootState)

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

const deleteList = createAsyncThunk(
  types.DELETE_LIST,
  async (listId: IList['id'], { dispatch, getState }) => {
    const sessionId = sessionIdSelector(getState() as RootState)

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

const fetchListDetail = createAsyncThunk(
  types.FETCH_LIST_DETAIL,
  async ({ listId, page }: fetchListDetailProps, { rejectWithValue }) => {
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

const addToList = createAsyncThunk(
  types.ADD_TO_LIST,
  async ({ listId, movieId }: AddToListProps, { dispatch, getState }) => {
    const sessionId = sessionIdSelector(getState() as RootState)

    try {
      await httpClient.request({
        data: { media_id: movieId },
        method: 'post',
        params: { session_id: sessionId },
        url: routes.addToList(listId)
      })

      await dispatch(fetchLists('1'))

      const movie = selectMovieById(getState() as RootState, movieId)
      const movieTitle = movie!.title
      const lists = listsSelector(getState() as RootState)
      const listName = lists!.results.find(list => list.id === listId)!.name

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

const removeFromList = createAsyncThunk(
  types.REMOVE_FROM_LIST,
  async ({ listId, movieId }: RemoveFromListProps, { dispatch, getState }) => {
    const sessionId = sessionIdSelector(getState() as RootState)

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
