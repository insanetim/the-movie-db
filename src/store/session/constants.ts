import createActionType from 'src/utils/state/createActionType'

const namespace = 'session'

const LOG_IN = createActionType(namespace, 'LOG_IN')

const LOG_OUT = createActionType(namespace, 'LOG_OUT')

const FETCH_ACCOUNT = createActionType(namespace, 'FETCH_ACCOUNT')

export { FETCH_ACCOUNT, LOG_IN, LOG_OUT }
