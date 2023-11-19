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
    builder.addCase(fetchLists.pending, setState.pending)
    builder.addCase(fetchLists.fulfilled, setState.fulfilled)
    builder.addCase(fetchLists.rejected, setState.rejected)
  }
)

const listDetailReducer = createReducer(initialState.listDetail, builder => {
  builder.addCase(fetchListDetail.pending, setState.pending)
  builder.addCase(fetchListDetail.fulfilled, setState.fulfilled)
  builder.addCase(fetchListDetail.rejected, setState.rejected)
})

export default combineReducers({
  createdLists: createdListsReducer,
  listDetail: listDetailReducer
})
