import createActionType from 'src/utils/state/createActionType'

const namespace = 'watchlist'

const FETCH_WATCHLIST = createActionType(namespace, 'FETCH_WATCHLIST')

export { FETCH_WATCHLIST }
