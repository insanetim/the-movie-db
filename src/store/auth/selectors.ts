import { RootState } from '../index'

const accountSelector = (state: RootState) => {
  return state.auth.account
}
const isAuthenticatedSelector = (state: RootState) => {
  return state.auth.isAuthenticated
}

export { accountSelector, isAuthenticatedSelector }
