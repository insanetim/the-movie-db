import { getPersonDetails } from 'src/api/tmdb/apiRoutes'
import errorMessage from 'src/utils/helpers/errorMessage'

import { createAppAsyncThunk } from '../withTypes'
import * as types from './constants'

const fetchPersonDetails = createAppAsyncThunk(
  types.fetchPersonDetails,
  async function (personId: number, { rejectWithValue }) {
    try {
      const personDetails = await getPersonDetails({ personId })

      return personDetails
    } catch (error) {
      return rejectWithValue(errorMessage(error))
    }
  }
)

export { fetchPersonDetails }
