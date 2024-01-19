import { combineReducers, createSlice } from '@reduxjs/toolkit'

import { fetchListDetail, fetchLists } from './actions'
import { ListsState } from './types'

const initialState: ListsState = {
  createdLists: {
    data: null,
    error: null,
    loading: true,
  },
  listDetail: {
    data: null,
    error: null,
    loading: true,
  },
}

const createdListsSlice = createSlice({
  extraReducers(builder) {
    builder
      .addCase(fetchLists.pending, state => {
        state.loading = true
        state.data = null
        state.error = null
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
  initialState: initialState.createdLists,
  name: 'createdLists',
  reducers: {},
})

const listDetailSlice = createSlice({
  extraReducers(builder) {
    builder
      .addCase(fetchListDetail.pending, state => {
        state.loading = true
        state.data = null
        state.error = null
      })
      .addCase(fetchListDetail.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchListDetail.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
  initialState: initialState.listDetail,
  name: 'listDetail',
  reducers: {},
})

export default combineReducers({
  createdLists: createdListsSlice.reducer,
  listDetail: listDetailSlice.reducer,
})
