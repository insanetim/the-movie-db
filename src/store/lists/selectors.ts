import type { RootState } from '../index'

export const listsSelector = (state: RootState) => {
  return state.lists.createdLists.lists
}

export const listSelector = (state: RootState) => {
  return state.lists.listDetail.list
}
