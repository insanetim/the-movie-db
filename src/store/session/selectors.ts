import type { RootState } from '../index'

export const sessionIdSelector = (state: RootState) => {
  return state.session.sessionId
}

export const accountSelector = (state: RootState) => {
  return state.session.account
}

export const loadingSelector = (state: RootState) => {
  return state.session.loading
}
