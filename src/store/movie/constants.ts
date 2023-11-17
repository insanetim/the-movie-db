import createActionType from 'src/utils/state/createActionType'

const namespace = 'movie'

const fetchMovieDetail = createActionType(namespace, 'fetchMovieDetail')
const changeMovieInFavorite = createActionType(
  namespace,
  'changeMovieInFavorite'
)
const changeMovieInWatchlist = createActionType(
  namespace,
  'changeMovieInWatchlist'
)

export { changeMovieInFavorite, changeMovieInWatchlist, fetchMovieDetail }
