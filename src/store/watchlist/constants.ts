import createActionType from 'src/utils/state/createActionType'

const namespace = 'watchlist'

const fetchWatchlist = createActionType(namespace, 'fetchWatchlist')

export { fetchWatchlist }
