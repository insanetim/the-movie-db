import { getFavorite } from 'src/api/tmdb/apiRoutes'
import errorMessage from 'src/utils/helpers/errorMessage'

import { selectAccount, selectSessionId } from '../features/auth'
import { createAppAsyncThunk } from '../withTypes'
import * as types from './constants'

const fetchFavorite = createAppAsyncThunk(
  types.fetchFavorite,
  async function (page: string, { getState, rejectWithValue }) {
    const sessionId = selectSessionId(getState())!
    const { id: accountId } = selectAccount(getState())!

    try {
      const favorite = await getFavorite({ accountId, page, sessionId })

      return favorite
    } catch (error) {
      return rejectWithValue(errorMessage(error))
    }
  }
)

export { fetchFavorite }
