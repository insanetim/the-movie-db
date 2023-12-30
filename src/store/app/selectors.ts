import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../index'

const appReducer = (state: RootState) => state.app

const modalSelector = createSelector([appReducer], app => app.modal)

const notificationsSelector = createSelector(
  [appReducer],
  app => app.notifications
)

export { modalSelector, notificationsSelector }
