import * as R from 'ramda'

export const sessionIdSelector = R.path(['session', 'sessionId'])
export const accountSelector = R.path(['session', 'account'])
