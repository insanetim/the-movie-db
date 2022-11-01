import * as R from 'ramda'

export const movieSelector = R.path(['movie', 'movie'])
export const movieInFavoritesSelector = R.path(['movie', 'movieInFavorites'])
export const movieInWatchlistSelector = R.path(['movie', 'movieInWatchlist'])
