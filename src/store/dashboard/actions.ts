import { getTrending, searchMovies } from 'src/api/tmdb/apiRoutes'
import errorMessage from 'src/utils/helpers/errorMessage'

import { createAppAsyncThunk } from '../withTypes'
import * as types from './constants'
import { FetchSearchProps } from './types'

const fetchTrending = createAppAsyncThunk(
  types.fetchTrending,
  async function (page: string, { rejectWithValue }) {
    try {
      const movies = await getTrending({ page })

      return movies
    } catch (error) {
      return rejectWithValue(errorMessage(error))
    }
  }
)

const fetchSearch = createAppAsyncThunk(
  types.fetchSearch,
  async function ({ page, query }: FetchSearchProps, { rejectWithValue }) {
    try {
      const movies = await searchMovies({ page, query })

      return movies
    } catch (error) {
      return rejectWithValue(errorMessage(error))
    }
  }
)

export { fetchSearch, fetchTrending }
