import { createReducer } from '@reduxjs/toolkit'
import { IAccount } from 'src/interfaces/account.interface'
import getSessionId from 'src/utils/helpers/getSessionId'

import { fetchAccount, logIn, logOut } from './actions'
import { AuthState } from './types'

const initialState: AuthState = {
  account: null,
  sessionId: getSessionId(),
}

const sessionReducer = createReducer(initialState, builder => {
  builder
    .addCase(logIn.fulfilled, (state, action) => {
      state.sessionId = action.payload as string
    })
    .addCase(logOut.fulfilled, state => {
      state.sessionId = ''
      state.account = null
    })
    .addCase(fetchAccount.fulfilled, (state, action) => {
      state.account = action.payload as IAccount
    })
})

export default sessionReducer
