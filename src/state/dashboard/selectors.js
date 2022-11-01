import * as R from 'ramda'

export const trendingSelector = R.path(['dashboard', 'trending'])
export const searchSelector = R.path(['dashboard', 'search', 'search'])
export const searchQuerySelector = R.path(['dashboard', 'search', 'searchQuery'])
