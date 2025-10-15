import { getWatchlist } from 'src/api/tmdb/apiRoutes'
import { selectAccount } from 'src/store/features/auth'
import errorMessage from 'src/utils/helpers/errorMessage'

import { selectSessionId } from '../features/auth'
import { createAppAsyncThunk } from '../withTypes'
import * as types from './constants'

const fetchWatchlist = createAppAsyncThunk(
  types.fetchWatchlist,
  async function (page: string, { getState, rejectWithValue }) {
    const sessionId = selectSessionId(getState())!
    const { id: accountId } = selectAccount(getState())!

    try {
      const watchlist = await getWatchlist({ accountId, page, sessionId })

      return watchlist
    } catch (error) {
      return rejectWithValue(errorMessage(error))
    }
  }
)

export { fetchWatchlist }
