import { path } from 'ramda'

export const movieSelector = path(['movie', 'movie'])
export const movieLoadingSelector = path(['movie', 'loading'])
export const movieErrorSelector = path(['movie', 'error'])
