import type { IAccount } from 'src/interfaces/account.interface'
import type { IListDetail, IListsList } from 'src/interfaces/list.interface'

import { createAsyncThunk } from '@reduxjs/toolkit'
import { pathOr } from 'ramda'
import { NOTIFICATION_TYPE } from 'src/constants/app'
import httpClient from 'src/lib/api/httpClient'
import * as routes from 'src/lib/apiRoutes'
import { showNotification } from 'src/store/app/actions'
import { movieSelector } from 'src/store/movie/selectors'
import { accountSelector, sessionIdSelector } from 'src/store/session/selectors'

import type { RootState } from '../index'
import type { AddToListProps, CreateListProps, CreateListResponse, ListId, RemoveFromListProps } from './types'

import * as types from './constants'
import { listSelector, listsSelector } from './selectors'

export const fetchLists = createAsyncThunk(
  types.FETCH_LISTS,
  async (page: number, { fulfillWithValue, getState, rejectWithValue }) => {
    const sessionId = sessionIdSelector(getState() as RootState)
    const { id: accountId } = accountSelector(getState() as RootState) as IAccount

    try {
      const { data } = await httpClient.request<IListsList>({
        params: { page, session_id: sessionId },
        url: routes.getCreatedLists(accountId)
      })

      return fulfillWithValue(data)
    } catch (error) {
      const message = pathOr('Something went wrong!', ['response', 'data', 'status_message'], error)

      return rejectWithValue(message)
    }
  }
)

export const fetchList = createAsyncThunk(
  types.FETCH_LIST,
  async (listId: ListId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await httpClient.request<IListDetail>({
        url: routes.getListDetails(listId)
      })

      return fulfillWithValue(data)
    } catch (error) {
      const message = pathOr('Something went wrong!', ['response', 'data', 'status_message'], error)

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
        data: { ...listData },
        method: 'post',
        params: { session_id: sessionId },
        url: routes.createList
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
      const messageText = pathOr('Something went wrong!', ['response', 'data', 'status_message'], error)

      dispatch(
        showNotification({
          messageText,
          messageType: NOTIFICATION_TYPE.ERROR
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
        data: { media_id: movieId },
        method: 'post',
        params: { session_id: sessionId },
        url: routes.addToList(listId)
      })

      const messageText = `${movieTitle} added to ${listName}`

      dispatch(showNotification({ messageText }))
    } catch (error) {
      const messageText = pathOr('Something went wrong!', ['response', 'data', 'status_message'], error)

      dispatch(
        showNotification({
          messageText,
          messageType: NOTIFICATION_TYPE.ERROR
        })
      )
    }
  }
)

export const removeFromList = createAsyncThunk(
  types.REMOVE_FROM_LIST,
  async ({ listId, movieId }: RemoveFromListProps, { dispatch, fulfillWithValue, getState }) => {
    const sessionId = sessionIdSelector(getState() as RootState)
    const list = listSelector(getState() as RootState)
    const movieTitle = list?.items.find(movie => movie.id === movieId)?.title
    const listName = list?.name

    try {
      await httpClient.request({
        data: { media_id: movieId },
        method: 'post',
        params: { session_id: sessionId },
        url: routes.removeFromList(listId)
      })

      const messageText = `${movieTitle} removed from ${listName}`

      dispatch(showNotification({ messageText }))

      return fulfillWithValue(movieId)
    } catch (error) {
      const messageText = pathOr('Something went wrong!', ['response', 'data', 'status_message'], error)

      dispatch(
        showNotification({
          messageText,
          messageType: NOTIFICATION_TYPE.ERROR
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
      method: 'delete',
      params: { session_id: sessionId },
      url: routes.deleteList(listId)
    })
  } catch (error) {
    const errorMessage = `${listName} list has been removed`

    dispatch(showNotification({ messageText: errorMessage }))
  } finally {
    dispatch(fetchLists(1))
  }
})
