import { createReducer } from '@reduxjs/toolkit'
import { isEmpty, not } from 'ramda'
import { IAccount } from 'src/interfaces/account.interface'
import getSessionId from 'src/utils/helpers/getSessionId'

import { fetchAccount, logIn, logOut } from './actions'
import { AuthState } from './types'

const initialState: AuthState = {
  account: null,
  isAuthenticated: not(isEmpty(getSessionId())),
  sessionId: getSessionId(),
}

const sessionReducer = createReducer(initialState, builder => {
  builder
    .addCase(logIn.fulfilled, (state, action) => {
      state.isAuthenticated = true
      state.sessionId = action.payload as string
    })
    .addCase(logOut.fulfilled, state => {
      state.account = null
      state.isAuthenticated = false
      state.sessionId = ''
    })
    .addCase(fetchAccount.fulfilled, (state, action) => {
      state.account = action.payload as IAccount
    })
})

export default sessionReducer
