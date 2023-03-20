import { path } from 'ramda'

export const trendingMoviesSelector = path(['dashboard', 'trending', 'movies'])
export const trendingPageSelector = path(['dashboard', 'trending', 'page'])
export const trendingLoadingSelector = path(['dashboard', 'trending', 'loading'])
export const trendingErrorSelector = path(['dashboard', 'trending', 'error'])
export const searchMoviesSelector = path(['dashboard', 'search', 'movies'])
export const searchPageSelector = path(['dashboard', 'search', 'page'])
export const searchLoadingSelector = path(['dashboard', 'search', 'loading'])
export const searchErrorSelector = path(['dashboard', 'search', 'error'])
