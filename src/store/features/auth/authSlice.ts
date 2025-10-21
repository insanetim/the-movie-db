import { createAppSlice } from 'src/store/withTypes'

import { authApiSlice } from './authApiSlice'
import { AuthState } from './types'

const initialState: AuthState = {
  account: null,
  sessionId: null,
}

export const authSlice = createAppSlice({
  extraReducers(builder) {
    builder
      .addMatcher(
        authApiSlice.endpoints.createSession.matchFulfilled,
        (state, action) => {
          state.sessionId = action.payload.session_id
        }
      )
      .addMatcher(
        authApiSlice.endpoints.getAccount.matchFulfilled,
        (state, action) => {
          state.account = action.payload
        }
      )
      .addMatcher(
        authApiSlice.endpoints.deleteSession.matchFulfilled,
        state => {
          state.account = null
          state.sessionId = null
        }
      )
  },
  initialState,
  name: 'auth',
  reducers: {},
  selectors: {
    selectAccount: state => state.account,
    selectSessionId: state => state.sessionId,
  },
})

export const { selectAccount, selectSessionId } = authSlice.selectors

export const authReducer = authSlice.reducer
