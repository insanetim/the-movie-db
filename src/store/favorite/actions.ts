import type { IAccount } from 'src/interfaces/account.interface'
import type { IMoviesList } from 'src/interfaces/movie.interface'

import { createAsyncThunk } from '@reduxjs/toolkit'
import httpClient from 'src/lib/api/httpClient'
import { getFavorite } from 'src/lib/apiRoutes'
import { accountSelector, sessionIdSelector } from 'src/store/session/selectors'
import errorMessage from 'src/utils/helpers/errorMessage'

import type { RootState } from '../index'

import { FETCH_FAVORITE } from './constants'

const fetchFavorite = createAsyncThunk(
  FETCH_FAVORITE,
  async (page: string, { getState, rejectWithValue }) => {
    const sessionId = sessionIdSelector(getState() as RootState)
    const { id: accountId } = accountSelector(
      getState() as RootState
    ) as IAccount

    try {
      const { data } = await httpClient.request<IMoviesList>({
        params: { page, session_id: sessionId },
        url: getFavorite(accountId)
      })

      return data
    } catch (error) {
      return rejectWithValue(errorMessage(error))
    }
  }
)

export { fetchFavorite }
