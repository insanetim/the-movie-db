import { createAsyncThunk } from '@reduxjs/toolkit'
import { getPersonDetails } from 'src/api/apiRoutes'
import { IPersonDetails } from 'src/interfaces/person.interface'
import { RootState } from 'src/store'
import errorMessage from 'src/utils/helpers/errorMessage'

import * as types from './constants'

const fetchPersonDetails = createAsyncThunk<
  IPersonDetails,
  number,
  { rejectValue: string; state: RootState }
>(types.fetchPersonDetails, async function (personId, { rejectWithValue }) {
  try {
    const movieDetails = await getPersonDetails({ personId })

    return movieDetails
  } catch (error) {
    return rejectWithValue(errorMessage(error))
  }
})

export { fetchPersonDetails }
