import type { IAccount } from 'src/interfaces/account.interface'
import type { IMoviesList } from 'src/interfaces/movie.interface'

import { createAsyncThunk } from '@reduxjs/toolkit'
import httpClient from 'src/lib/api/httpClient'
import { getWatchlist } from 'src/lib/apiRoutes'
import { accountSelector, sessionIdSelector } from 'src/store/session/selectors'
import errorMessage from 'src/utils/helpers/errorMessage'

import type { RootState } from '../index'

import { FETCH_WATCHLIST } from './constants'

const fetchWatchlist = createAsyncThunk(
  FETCH_WATCHLIST,
  async (page: string, { getState, rejectWithValue }) => {
    const sessionId = sessionIdSelector(getState() as RootState)
    const { id: accountId } = accountSelector(
      getState() as RootState
    ) as IAccount

    try {
      const { data } = await httpClient.request<IMoviesList>({
        params: { page, session_id: sessionId },
        url: getWatchlist(accountId)
      })

      return data
    } catch (error) {
      return rejectWithValue(errorMessage(error))
    }
  }
)

export { fetchWatchlist }
