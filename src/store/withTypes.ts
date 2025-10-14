import {
  asyncThunkCreator,
  buildCreateSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit'
import { AppDispatch, RootState } from 'src/store'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  dispatch: AppDispatch
  state: RootState
}>()
export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})
