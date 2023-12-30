import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../index'

const authReducer = (state: RootState) => state.auth

const accountSelector = createSelector([authReducer], auth => auth.account)

const isAuthenticatedSelector = createSelector(
  [authReducer],
  auth => auth.isAuthenticated
)

export { accountSelector, isAuthenticatedSelector }
