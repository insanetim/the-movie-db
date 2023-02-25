import { path } from 'ramda'

export const favoritesMoviesSelector = path(['favorites', 'movies'])
export const favoritesPageSelector = path(['favorites', 'page'])
export const favoritesLoadingSelector = path(['favorites', 'loading'])
export const favoritesErrorSelector = path(['favorites', 'error'])
