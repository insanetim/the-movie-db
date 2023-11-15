import { combineReducers, createReducer } from '@reduxjs/toolkit'

import type { IListState, IListsState } from './types'

import { fetchListDetail, fetchLists } from './actions'

const listsInitialState: IListsState = {
  error: null,
  lists: null,
  loading: true
}

const createdListsReducer = createReducer(listsInitialState, builder => {
  builder.addCase(fetchLists.pending, state => {
    state.loading = true
    state.lists = null
    state.error = null
  })
  builder.addCase(fetchLists.fulfilled, (state, action) => {
    state.loading = false
    state.lists = action.payload
  })
  builder.addCase(fetchLists.rejected, (state, action) => {
    state.loading = false
    state.error = action.payload as string
  })
})

const listInitialState: IListState = {
  error: null,
  list: null,
  loading: true
}

const listDetailReducer = createReducer(listInitialState, builder => {
  builder.addCase(fetchListDetail.pending, state => {
    state.loading = true
    state.list = null
    state.error = null
  })
  builder.addCase(fetchListDetail.fulfilled, (state, action) => {
    state.loading = false
    state.list = action.payload
  })
  builder.addCase(fetchListDetail.rejected, (state, action) => {
    state.loading = false
    state.error = action.payload as string
  })
})

export { createdListsReducer, listDetailReducer }

export default combineReducers({
  createdLists: createdListsReducer,
  listDetail: listDetailReducer
})
