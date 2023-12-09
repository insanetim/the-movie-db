import { RootState } from '../index'

const listsSelector = (state: RootState) => {
  return state.lists.createdLists.data
}
const listsLoadingSelector = (state: RootState) => {
  return state.lists.createdLists.loading
}
const listsErrorSelector = (state: RootState) => {
  return state.lists.createdLists.error
}
const listDetailSelector = (state: RootState) => {
  return state.lists.listDetail.data
}
const listDetailLoadingSelector = (state: RootState) => {
  return state.lists.listDetail.loading
}
const listDetailErrorSelector = (state: RootState) => {
  return state.lists.listDetail.error
}

export {
  listDetailErrorSelector,
  listDetailLoadingSelector,
  listDetailSelector,
  listsErrorSelector,
  listsLoadingSelector,
  listsSelector,
}
