import { createAsyncThunk } from '@reduxjs/toolkit'
import { pathOr } from 'ramda'

import { NOTIFICATION_TYPE } from 'src/constants/app'
import httpClient from 'src/lib/api/httpClient'
import * as routes from 'src/lib/apiRoutes'
import type { IAccount } from 'src/interfaces/account.interface'
import type { IListDetail, IListsList } from 'src/interfaces/list.interface'
import type { RootState } from '../index'
import type { AddToListProps, CreateListProps, CreateListResponse, ListId, RemoveFromListProps } from './types'
import { accountSelector, sessionIdSelector } from 'src/store/session/selectors'
import { movieSelector } from 'src/store/movie/selectors'
import { listSelector, listsSelector } from './selectors'
import { showNotification } from 'src/store/app/actions'
import * as types from './constants'

export const fetchLists = createAsyncThunk(
  types.FETCH_LISTS,
  async (page: number, { getState, rejectWithValue, fulfillWithValue }) => {
    const sessionId = sessionIdSelector(getState() as RootState)
    const { id: accountId } = accountSelector(getState() as RootState) as IAccount

    try {
      const { data } = await httpClient.request<IListsList>({
        url: routes.getCreatedLists(accountId),
        params: { session_id: sessionId, page }
      })

      return fulfillWithValue(data)
    } catch (error) {
      const message = pathOr('Something went wrong!', ['message'], error)

      return rejectWithValue(message)
    }
  }
)

export const fetchList = createAsyncThunk(
  types.FETCH_LIST,
  async (listId: ListId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await httpClient.request<IListDetail>({
        url: routes.getListDetails(listId)
      })

      return fulfillWithValue(data)
    } catch (error) {
      const message = pathOr('Something went wrong!', ['message'], error)

      return rejectWithValue(message)
    }
  }
)

export const createList = createAsyncThunk(
  types.CREATE_LIST,
  async ({ listData, movieId }: CreateListProps, { dispatch, getState }) => {
    const sessionId = sessionIdSelector(getState() as RootState)

    try {
      const { data } = await httpClient.request<CreateListResponse>({
        url: routes.createList,
        method: 'post',
        params: { session_id: sessionId },
        data: { ...listData }
      })

      await dispatch(fetchLists(1))

      if (typeof movieId !== 'undefined') {
        dispatch(
          addToList({
            listId: data.list_id,
            movieId
          })
        )
      }
    } catch (error) {
      const messageText = pathOr('Something went wrong!', ['message'], error)

      dispatch(
        showNotification({
          messageType: NOTIFICATION_TYPE.ERROR,
          messageText
        })
      )
    }
  }
)

export const addToList = createAsyncThunk(
  types.ADD_TO_LIST,
  async ({ listId, movieId }: AddToListProps, { dispatch, getState }) => {
    const sessionId = sessionIdSelector(getState() as RootState)
    const movie = movieSelector(getState() as RootState)
    const movieTitle = movie?.title
    const lists = listsSelector(getState() as RootState)
    const listName = lists?.results.find(list => list.id === +listId)?.name

    try {
      await httpClient.request({
        url: routes.addToList(listId),
        method: 'post',
        params: { session_id: sessionId },
        data: { media_id: movieId }
      })

      const messageText = `${movieTitle} added to ${listName}`

      dispatch(showNotification({ messageText }))
    } catch (error) {
      const messageText = pathOr('Something went wrong!', ['message'], error)

      dispatch(
        showNotification({
          messageType: NOTIFICATION_TYPE.ERROR,
          messageText
        })
      )
    }
  }
)

export const removeFromList = createAsyncThunk(
  types.REMOVE_FROM_LIST,
  async ({ listId, movieId }: RemoveFromListProps, { dispatch, getState, fulfillWithValue }) => {
    const sessionId = sessionIdSelector(getState() as RootState)
    const list = listSelector(getState() as RootState)
    const movieTitle = list?.items.find(movie => movie.id === movieId)?.title
    const listName = list?.name

    try {
      await httpClient.request({
        url: routes.removeFromList(listId),
        method: 'post',
        params: { session_id: sessionId },
        data: { media_id: movieId }
      })

      const messageText = `${movieTitle} removed from ${listName}`

      dispatch(showNotification({ messageText }))

      return fulfillWithValue(movieId)
    } catch (error) {
      const messageText = pathOr('Something went wrong!', ['message'], error)

      dispatch(
        showNotification({
          messageType: NOTIFICATION_TYPE.ERROR,
          messageText
        })
      )
    }
  }
)

export const deleteList = createAsyncThunk(types.DELETE_LIST, async (listId: ListId, { dispatch, getState }) => {
  const sessionId = sessionIdSelector(getState() as RootState)
  const lists = listsSelector(getState() as RootState)
  const listName = lists?.results.find(list => list.id === +listId)?.name

  try {
    await httpClient.request({
      url: routes.deleteList(listId),
      method: 'delete',
      params: { session_id: sessionId }
    })
  } catch (error) {
    const errorMessage = `${listName} list has been removed`

    dispatch(showNotification({ messageText: errorMessage }))
  } finally {
    dispatch(fetchLists(1))
  }
})
