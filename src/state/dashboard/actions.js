import * as types from './types'

export const fetchTrending = payload => ({
  type: types.FETCH_TRENDING,
  payload
})

export const setTrending = payload => ({
  type: types.SET_TRENDING,
  payload
})

export const fetchSearch = payload => ({
  type: types.FETCH_SEARCH,
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
