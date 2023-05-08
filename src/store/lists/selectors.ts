import type { RootState } from '../index'

export const listsSelector = (state: RootState) => {
  return state.lists.createdLists.lists
}
export const listsLoadingSelector = (state: RootState) => {
  return state.lists.createdLists.loading
}
export const listsErrorSelector = (state: RootState) => {
  return state.lists.createdLists.error
}
export const listSelector = (state: RootState) => {
  return state.lists.listDetail.list
}
export const listLoadingSelector = (state: RootState) => {
  return state.lists.listDetail.loading
}
export const listErrorSelector = (state: RootState) => {
  return state.lists.listDetail.error
}
