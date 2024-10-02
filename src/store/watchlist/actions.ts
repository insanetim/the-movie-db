import { getWatchlist } from 'src/api/tmdb/apiRoutes'
import { accountSelector } from 'src/store/auth/selectors'
import errorMessage from 'src/utils/helpers/errorMessage'
import getSessionId from 'src/utils/helpers/getSessionId'

import { createAppAsyncThunk } from '../withTypes'
import * as types from './constants'

const fetchWatchlist = createAppAsyncThunk(
  types.fetchWatchlist,
  async function (page: string, { getState, rejectWithValue }) {
    const sessionId = getSessionId()
    const { id: accountId } = accountSelector(getState())!

    try {
      const watchlist = await getWatchlist({ accountId, page, sessionId })

      return watchlist
    } catch (error) {
      return rejectWithValue(errorMessage(error))
    }
  }
)

export { fetchWatchlist }
