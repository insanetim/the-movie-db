import { createSlice } from '@reduxjs/toolkit'
import { isEmpty, not } from 'ramda'
import { IAccount } from 'src/interfaces/account.interface'
import getSessionId from 'src/utils/helpers/getSessionId'

import { fetchAccount, logIn, logOut } from './actions'
import { AuthState } from './types'

const initialState: AuthState = {
  account: null,
  isAuthenticated: not(isEmpty(getSessionId())),
}

const authSlice = createSlice({
  extraReducers(builder) {
    builder
      .addCase(logIn.fulfilled, state => {
        state.isAuthenticated = true
      })
      .addCase(logOut.fulfilled, state => {
        state.account = null
        state.isAuthenticated = false
      })
      .addCase(fetchAccount.fulfilled, (state, action) => {
        state.account = action.payload as IAccount
      })
  },
  initialState,
  name: 'auth',
  reducers: {},
  selectors: {
    accountSelector: state => state.account,
    isAuthenticatedSelector: state => state.isAuthenticated,
  },
})

export const { accountSelector, isAuthenticatedSelector } = authSlice.selectors

export default authSlice.reducer
