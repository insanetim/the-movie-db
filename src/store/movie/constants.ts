import createActionType from 'src/utils/state/createActionType'

const namespace = 'movie'

export const FETCH_MOVIE = createActionType(namespace, 'FETCH_MOVIE')

export const CHANGE_MOVIE_IN_FAVORITE = createActionType(
  namespace,
  'CHANGE_MOVIE_IN_FAVORITE'
)

export const CHANGE_MOVIE_IN_WATCHLIST = createActionType(
  namespace,
  'CHANGE_MOVIE_IN_WATCHLIST'
)
