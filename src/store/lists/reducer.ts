import { combineReducers, createReducer } from '@reduxjs/toolkit'

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

const createdListsReducer = createReducer(
  initialState.createdLists,
  builder => {
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
  }
)

const listDetailReducer = createReducer(initialState.listDetail, builder => {
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
})

export default combineReducers({
  createdLists: createdListsReducer,
  listDetail: listDetailReducer,
})
