import * as types from './types'

export const fetchTrending = page => ({
  type: types.FETCH_TRENDING,
  payload: page
})

export const fetchTrendingRequest = page => ({
  type: types.FETCH_TRENDING_REQUEST,
  payload: page
})

export const fetchTrendingSuccess = movies => ({
  type: types.FETCH_TRENDING_SUCCESS,
  payload: movies
})

export const fetchTrendingFailure = error => ({
  type: types.FETCH_TRENDING_FAILURE,
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

export const fetchSearchRequest = page => ({
  type: types.FETCH_SEARCH_REQUEST,
  payload: page
})

export const fetchSearchSuccess = movies => ({
  type: types.FETCH_SEARCH_SUCCESS,
  payload: movies
})

export const fetchSearchFailure = error => ({
  type: types.FETCH_SEARCH_FAILURE,
  payload: error
})

export const setSearchPage = page => ({
  type: types.SET_SEARCH_PAGE,
  payload: page
})
