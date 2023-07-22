import type { IListDetail } from 'src/interfaces/list.interface'

import { combineReducers, createReducer } from '@reduxjs/toolkit'

import type { IListState, IListsState } from './types'

import { fetchList, fetchLists, removeFromList } from './actions'

const listsInitialState: IListsState = {
  lists: null
}

export const createdListsReducer = createReducer(listsInitialState, builder => {
  builder.addCase(fetchLists.pending, state => {
    state.lists = null
  })
  builder.addCase(fetchLists.fulfilled, (state, action) => {
    state.lists = action.payload
  })
})

const listInitialState: IListState = {
  list: null
}

export const listDetailReducer = createReducer(listInitialState, builder => {
  builder.addCase(fetchList.pending, state => {
    state.list = null
  })
  builder.addCase(fetchList.fulfilled, (state, action) => {
    state.list = action.payload as IListDetail
  })
  builder.addCase(removeFromList.fulfilled, (state, action) => {
    state.list!.items = state.list!.items.filter(item => item.id !== action.payload)
  })
})

export default combineReducers({
  createdLists: createdListsReducer,
  listDetail: listDetailReducer
})
