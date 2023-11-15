import createActionType from 'src/utils/state/createActionType'

const namespace = 'movie'

const FETCH_MOVIE_DETAIL = createActionType(namespace, 'FETCH_MOVIE_DETAIL')

const CHANGE_MOVIE_IN_FAVORITE = createActionType(
  namespace,
  'CHANGE_MOVIE_IN_FAVORITE'
)

const CHANGE_MOVIE_IN_WATCHLIST = createActionType(
  namespace,
  'CHANGE_MOVIE_IN_WATCHLIST'
)

export {
  CHANGE_MOVIE_IN_FAVORITE,
  CHANGE_MOVIE_IN_WATCHLIST,
  FETCH_MOVIE_DETAIL
}
