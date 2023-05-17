import { createAsyncThunk } from '@reduxjs/toolkit'
import { pathOr } from 'ramda'

import httpClient from 'src/lib/api/httpClient'
import { getFavorite } from 'src/lib/apiRoutes'
import type { IAccount } from 'src/interfaces/account.interface'
import type { IMoviesList } from 'src/interfaces/movie.interface'
import type { RootState } from '../index'
import { accountSelector, sessionIdSelector } from 'src/store/session/selectors'
import { FETCH_FAVORITE } from './constants'

export const fetchFavorite = createAsyncThunk(
  FETCH_FAVORITE,
  async (page: number, { getState, rejectWithValue, fulfillWithValue }) => {
    const sessionId = sessionIdSelector(getState() as RootState)
    const { id: accountId } = accountSelector(getState() as RootState) as IAccount

    try {
      const { data } = await httpClient.request<IMoviesList>({
        url: getFavorite(accountId),
        params: { session_id: sessionId, page }
      })

      return fulfillWithValue(data)
    } catch (error) {
      const message = pathOr('Something went wrong!', ['response', 'data', 'status_message'], error)

      return rejectWithValue(message)
    }
  }
)
