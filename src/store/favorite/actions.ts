import { createAsyncThunk } from '@reduxjs/toolkit'
import { getFavorite } from 'src/api/tmdb/apiRoutes'
import { IMoviesList } from 'src/interfaces/movie.interface'
import { RootState } from 'src/store'
import { accountSelector } from 'src/store/auth/selectors'
import errorMessage from 'src/utils/helpers/errorMessage'
import getSessionId from 'src/utils/helpers/getSessionId'

import * as types from './constants'

const fetchFavorite = createAsyncThunk<
  IMoviesList,
  string,
  { rejectValue: string; state: RootState }
>(types.fetchFavorite, async function (page, { getState, rejectWithValue }) {
  const sessionId = getSessionId()
  const accountId = accountSelector(getState())!.id

  try {
    const favorite = await getFavorite({ accountId, page, sessionId })

    return favorite
  } catch (error) {
    return rejectWithValue(errorMessage(error))
  }
})

export { fetchFavorite }
