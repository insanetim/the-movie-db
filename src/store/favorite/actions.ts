import { getFavorite } from 'src/api/tmdb/apiRoutes'
import { accountSelector } from 'src/store/auth/selectors'
import errorMessage from 'src/utils/helpers/errorMessage'
import getSessionId from 'src/utils/helpers/getSessionId'

import { createAppAsyncThunk } from '../withTypes'
import * as types from './constants'

const fetchFavorite = createAppAsyncThunk(
  types.fetchFavorite,
  async function (page: string, { getState, rejectWithValue }) {
    const sessionId = getSessionId()
    const { id: accountId } = accountSelector(getState())!

    try {
      const favorite = await getFavorite({ accountId, page, sessionId })

      return favorite
    } catch (error) {
      return rejectWithValue(errorMessage(error))
    }
  }
)

export { fetchFavorite }
