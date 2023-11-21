import { createAsyncThunk } from '@reduxjs/toolkit'
import { IMoviesList } from 'src/interfaces/movie.interface'
import httpClient from 'src/lib/api/httpClient'
import { getFavorite } from 'src/lib/apiRoutes'
import { accountSelector, sessionIdSelector } from 'src/store/session/selectors'
import errorMessage from 'src/utils/helpers/errorMessage'

import { RootState } from '../index'
import * as types from './constants'

const fetchFavorite = createAsyncThunk<
  IMoviesList,
  string,
  { rejectValue: string; state: RootState }
>(types.fetchFavorite, async function (page, { getState, rejectWithValue }) {
  const sessionId = sessionIdSelector(getState())
  const accountId = accountSelector(getState())!.id

  try {
    const { data } = await httpClient.request<IMoviesList>({
      params: { page, session_id: sessionId },
      url: getFavorite(accountId)
    })

    return data
  } catch (error) {
    return rejectWithValue(errorMessage(error))
  }
})

export { fetchFavorite }
