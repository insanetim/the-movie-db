import createActionType from 'src/utils/state/createActionType'

const namespace = 'session'

export const LOG_IN = createActionType(namespace, 'LOG_IN')
export const LOG_OUT = createActionType(namespace, 'LOG_OUT')
export const FETCH_ACCOUNT = createActionType(namespace, 'FETCH_ACCOUNT')
