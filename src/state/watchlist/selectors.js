import { path } from 'ramda'

export const watchlistMoviesSelector = path(['watchlist', 'movies'])
export const watchlistPageSelector = path(['watchlist', 'page'])
export const watchlistLoadingSelector = path(['watchlist', 'loading'])
export const watchlistErrorSelector = path(['watchlist', 'error'])
