import { createReducer } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { IAccount } from 'src/interfaces/account.interface'

import { fetchAccount, logIn, logOut } from './actions'
import { SessionState } from './types'

const initialState: SessionState = {
  account: null,
  sessionId: Cookies.get('tmdb.session_id') ?? '',
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
