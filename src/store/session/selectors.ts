import type { RootState } from '../index'

const sessionIdSelector = (state: RootState) => {
  return state.session.sessionId
}
const accountSelector = (state: RootState) => {
  return state.session.account
}
const loadingSelector = (state: RootState) => {
  return state.session.loading
}

export { accountSelector, loadingSelector, sessionIdSelector }
