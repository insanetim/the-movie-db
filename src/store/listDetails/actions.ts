import { createAsyncThunk } from '@reduxjs/toolkit'
import { IListDetails } from 'src/interfaces/list.interface'
import { getListDetails } from 'src/services/api/apiRoutes'
import errorMessage from 'src/utils/helpers/errorMessage'

import * as types from './constants'
import { FetchListDetailsProps } from './types'

const fetchListDetails = createAsyncThunk<
  IListDetails,
  FetchListDetailsProps,
  { rejectValue: string }
>(
  types.fetchListDetails,
  async function ({ listId, page }, { rejectWithValue }) {
    try {
      const listDetail = await getListDetails({ listId, page })

      return listDetail
    } catch (error) {
      return rejectWithValue(errorMessage(error))
    }
  }
)

export { fetchListDetails }
