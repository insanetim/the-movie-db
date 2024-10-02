import { getListDetails } from 'src/api/tmdb/apiRoutes'
import errorMessage from 'src/utils/helpers/errorMessage'

import { createAppAsyncThunk } from '../withTypes'
import * as types from './constants'
import { FetchListDetailsProps } from './types'

const fetchListDetails = createAppAsyncThunk(
  types.fetchListDetails,
  async function (
    { listId, page }: FetchListDetailsProps,
    { rejectWithValue }
  ) {
    try {
      const listDetail = await getListDetails({ listId, page })

      return listDetail
    } catch (error) {
      return rejectWithValue(errorMessage(error))
    }
  }
)

export { fetchListDetails }
