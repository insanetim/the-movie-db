import type { IAccount } from 'src/interfaces/account.interface'

import { createReducer } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

import type { SessionState } from './types'

import { fetchAccount, logIn, logOut } from './actions'

const initialState: SessionState = {
  account: null,
  loading: false,
  sessionId: Cookies.get('tmdb.session_id') ?? ''
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
