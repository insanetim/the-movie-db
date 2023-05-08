import { createReducer } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

import type { ISessionState } from './types'
import { fetchAccount, logIn, logOut } from './actions'
import { IAccount } from 'src/interfaces/account.interface'

const initialState: ISessionState = {
  sessionId: Cookies.get('session_id') || '',
  account: null,
  loading: false
}

const sessionReducer = createReducer(initialState, builder => {
  builder.addCase(logIn.pending, state => {
    state.loading = true
  })
  builder.addCase(logIn.fulfilled, (state, action) => {
    state.sessionId = action.payload as string
    state.loading = false
  })
  builder.addCase(logIn.rejected, state => {
    state.loading = false
  })
  builder.addCase(logOut.fulfilled, state => {
    state.sessionId = ''
    state.account = null
  })
  builder.addCase(fetchAccount.fulfilled, (state, action) => {
    state.account = action.payload as IAccount
  })
})

export default sessionReducer
