import * as types from './types'

export const requestTrending = payload => ({
  type: types.REQUEST_TRENDING,
  payload
})

export const setTrending = payload => ({
  type: types.SET_TRENDING,
  payload
})

export const requestSearch = payload => ({
  type: types.REQUEST_SEARCH,
  payload
})

export const setSearch = payload => ({
  type: types.SET_SEARCH,
  payload
})

export const setSearchQuery = payload => ({
  type: types.SET_SEARCH_QUERY,
  payload
})

export const clearSearch = () => ({
  type: types.CLEAR_SEARCH
})
