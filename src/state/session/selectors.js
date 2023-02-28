import { path } from 'ramda'

export const sessionIdSelector = path(['session', 'sessionId'])
export const accountSelector = path(['session', 'account'])
export const loadingSelector = path(['session', 'loading'])
