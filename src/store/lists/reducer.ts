import type { IListDetail } from 'src/interfaces/list.interface'

import { combineReducers, createReducer } from '@reduxjs/toolkit'

import type { IListState, IListsState } from './types'

import { fetchList, fetchLists, removeFromList } from './actions'

const listsInitialState: IListsState = {
  error: null,
  lists: null,
  loading: true
}

export const createdListsReducer = createReducer(listsInitialState, builder => {
  builder.addCase(fetchLists.pending, state => {
    state.lists = null
    state.loading = true
    state.error = null
  })
  builder.addCase(fetchLists.fulfilled, (state, action) => {
    state.lists = action.payload
    state.loading = false
  })
  builder.addCase(fetchLists.rejected, (state, action) => {
    state.error = action.payload as string
    state.loading = false
  })
})

const listInitialState: IListState = {
  error: null,
  list: null,
  loading: true
}

export const listDetailReducer = createReducer(listInitialState, builder => {
  builder.addCase(fetchList.pending, state => {
    state.list = null
    state.loading = true
    state.error = null
  })
  builder.addCase(fetchList.fulfilled, (state, action) => {
    state.list = action.payload as IListDetail
    state.loading = false
  })
  builder.addCase(fetchList.rejected, (state, action) => {
    state.error = action.payload as string
    state.loading = false
  })
  builder.addCase(removeFromList.fulfilled, (state, action) => {
    state.list!.items = state.list!.items.filter(item => item.id !== action.payload)
  })
})

export default combineReducers({
  createdLists: createdListsReducer,
  listDetail: listDetailReducer
})
