import createActionType from 'src/utils/stateHelpers/createActionType'

const namespace = 'movieDetails'

const fetchMovieDetails = createActionType(namespace, 'fetchMovieDetails')
const changeMovieInFavorite = createActionType(
  namespace,
  'changeMovieInFavorite'
)
const changeMovieInWatchlist = createActionType(
  namespace,
  'changeMovieInWatchlist'
)

export { changeMovieInFavorite, changeMovieInWatchlist, fetchMovieDetails }
