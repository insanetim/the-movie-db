import { path } from 'ramda'

export const trendingSelector = path(['dashboard', 'trending'])
export const searchSelector = path(['dashboard', 'search', 'search'])
export const searchQuerySelector = path(['dashboard', 'search', 'searchQuery'])
