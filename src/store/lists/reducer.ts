import { createReducer } from '@reduxjs/toolkit'

import type { ListsState } from './types'

import { fetchListDetail, fetchLists } from './actions'

const initialState: ListsState = {
  createdLists: {
    data: null,
    error: null,
    loading: true
  },
  listDetail: {
    data: null,
    error: null,
    loading: true
  }
}

const listsReducer = createReducer(initialState, builder => {
  builder.addCase(fetchLists.pending, state => {
    state.createdLists.loading = true
    state.createdLists.data = null
    state.createdLists.error = null
  })
  builder.addCase(fetchLists.fulfilled, (state, action) => {
    state.createdLists.loading = false
    state.createdLists.data = action.payload
  })
  builder.addCase(fetchLists.rejected, (state, action) => {
    state.createdLists.loading = false
    state.createdLists.error = action.payload as string
  })
  builder.addCase(fetchListDetail.pending, state => {
    state.listDetail.loading = true
    state.listDetail.data = null
    state.listDetail.error = null
  })
  builder.addCase(fetchListDetail.fulfilled, (state, action) => {
    state.listDetail.loading = false
    state.listDetail.data = action.payload
  })
  builder.addCase(fetchListDetail.rejected, (state, action) => {
    state.listDetail.loading = false
    state.listDetail.error = action.payload as string
  })
})

export default listsReducer
