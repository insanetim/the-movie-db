import { createAsyncThunk } from '@reduxjs/toolkit'
import { IMoviesList } from 'src/interfaces/movie.interface'
import { getWatchlist } from 'src/services/api/apiRoutes'
import { accountSelector, sessionIdSelector } from 'src/store/session/selectors'
import errorMessage from 'src/utils/helpers/errorMessage'

import { RootState } from '../index'
import * as types from './constants'

const fetchWatchlist = createAsyncThunk<
  IMoviesList,
  string,
  { rejectValue: string; state: RootState }
>(types.fetchWatchlist, async function (page, { getState, rejectWithValue }) {
  const sessionId = sessionIdSelector(getState())
  const accountId = accountSelector(getState())!.id

  try {
    const watchlist = await getWatchlist({ accountId, page, sessionId })

    return watchlist
  } catch (error) {
    return rejectWithValue(errorMessage(error))
  }
})

export { fetchWatchlist }
