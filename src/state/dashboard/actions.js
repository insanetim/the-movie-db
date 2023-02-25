import * as types from './types'

export const fetchTrending = page => ({
  type: types.FETCH_TRENDING,
  payload: page
})

export const fetchTrendingRequest = () => ({
  type: types.FETCH_TRENDING_REQUEST
})

export const fetchTrendingSuccess = movies => ({
  type: types.FETCH_TRENDING_SUCCESS,
  payload: movies
})

export const fetchTrendingError = error => ({
  type: types.FETCH_TRENDING_ERROR,
  payload: error
})

export const setTrendingPage = page => ({
  type: types.SET_TRENDING_PAGE,
  payload: page
})

export const fetchSearch = ({ page, query }) => ({
  type: types.FETCH_SEARCH,
  payload: { page, query }
})

export const fetchSearchRequest = () => ({
  type: types.FETCH_SEARCH_REQUEST
})

export const fetchSearchSuccess = movies => ({
  type: types.FETCH_SEARCH_SUCCESS,
  payload: movies
})

export const fetchSearchError = error => ({
  type: types.FETCH_SEARCH_ERROR,
  payload: error
})

export const setSearchPage = page => ({
  type: types.SET_SEARCH_PAGE,
  payload: page
})
