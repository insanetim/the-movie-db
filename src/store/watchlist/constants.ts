import createActionType from 'src/utils/stateHelpers/createActionType'

const namespace = 'watchlist'

const fetchWatchlist = createActionType(namespace, 'fetchWatchlist')

export { fetchWatchlist }
