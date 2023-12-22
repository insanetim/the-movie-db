import { RootState } from '../index'

const sessionIdSelector = (state: RootState) => {
  return state.auth.sessionId
}
const accountSelector = (state: RootState) => {
  return state.auth.account
}

export { accountSelector, sessionIdSelector }
