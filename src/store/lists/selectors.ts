import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../index'

const listsReducer = (state: RootState) => state.lists

const createdLists = createSelector([listsReducer], lists => lists.createdLists)

const listsSelector = createSelector([createdLists], lists => lists.data)

const listsLoadingSelector = createSelector(
  [createdLists],
  lists => lists.loading
)

const listsErrorSelector = createSelector([createdLists], lists => lists.error)

const listDetail = createSelector([listsReducer], lists => lists.listDetail)

const listDetailSelector = createSelector([listDetail], list => list.data)

const listDetailLoadingSelector = createSelector(
  [listDetail],
  list => list.loading
)

const listDetailErrorSelector = createSelector([listDetail], list => list.error)

export {
  listDetailErrorSelector,
  listDetailLoadingSelector,
  listDetailSelector,
  listsErrorSelector,
  listsLoadingSelector,
  listsSelector,
}
