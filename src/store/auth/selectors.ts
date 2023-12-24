import { RootState } from '../index'

const accountSelector = (state: RootState) => {
  return state.auth.account
}
const isAuthenticatedSelector = (state: RootState) => {
  return state.auth.isAuthenticated
}
const sessionIdSelector = (state: RootState) => {
  return state.auth.sessionId
}

export { accountSelector, isAuthenticatedSelector, sessionIdSelector }
