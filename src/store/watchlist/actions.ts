import { createAsyncThunk } from '@reduxjs/toolkit'
import { getWatchlist } from 'src/api/apiRoutes'
import { IMoviesList } from 'src/interfaces/movie.interface'
import { RootState } from 'src/store'
import { accountSelector } from 'src/store/auth/selectors'
import errorMessage from 'src/utils/helpers/errorMessage'
import getSessionId from 'src/utils/helpers/getSessionId'

import * as types from './constants'

const fetchWatchlist = createAsyncThunk<
  IMoviesList,
  string,
  { rejectValue: string; state: RootState }
>(types.fetchWatchlist, async function (page, { getState, rejectWithValue }) {
  const sessionId = getSessionId()
  const accountId = accountSelector(getState())!.id

  try {
    const watchlist = await getWatchlist({ accountId, page, sessionId })

    return watchlist
  } catch (error) {
    return rejectWithValue(errorMessage(error))
  }
})

export { fetchWatchlist }
