import { combineReducers, createReducer } from '@reduxjs/toolkit'
import setState from 'src/utils/stateHelpers/setState'

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

const createdListsReducer = createReducer(
  initialState.createdLists,
  builder => {
    builder
      .addCase(fetchLists.pending, setState.pending)
      .addCase(fetchLists.fulfilled, setState.fulfilled)
      .addCase(fetchLists.rejected, setState.rejected)
  }
)

const listDetailReducer = createReducer(initialState.listDetail, builder => {
  builder
    .addCase(fetchListDetail.pending, setState.pending)
    .addCase(fetchListDetail.fulfilled, setState.fulfilled)
    .addCase(fetchListDetail.rejected, setState.rejected)
})

export default combineReducers({
  createdLists: createdListsReducer,
  listDetail: listDetailReducer
})
