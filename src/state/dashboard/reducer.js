import { combineReducers } from 'redux'

import * as types from './types'

const trendingInitalState = {
  movies: {},
  page: 1,
  loading: true,
  error: null
}

export const trending = (state = trendingInitalState, action) => {
  switch (action.type) {
    case types.FETCH_TRENDING_REQUEST:
      return {
        ...state,
        movies: {},
        loading: true,
        error: null
      }
    case types.FETCH_TRENDING_SUCCESS:
      return {
        ...state,
        movies: action.payload,
        loading: false,
        error: null
      }
    case types.FETCH_TRENDING_ERROR:
      return {
        movies: {},
        page: 1,
        loading: false,
        error: action.payload
      }
    case types.SET_TRENDING_PAGE:
      return {
        ...state,
        page: action.payload
      }
    default:
      return state
  }
}

const searchInitalState = {
  movies: {},
  page: 1,
  loading: true,
  error: null
}

export const search = (state = searchInitalState, action) => {
  switch (action.type) {
    case types.FETCH_SEARCH_REQUEST:
      return {
        ...state,
        movies: {},
        loading: true,
        error: null
      }
    case types.FETCH_SEARCH_SUCCESS:
      return {
        ...state,
        movies: action.payload,
        loading: false,
        error: null
      }
    case types.FETCH_SEARCH_ERROR:
      return {
        movies: {},
        page: 1,
        loading: false,
        error: action.payload
      }
    case types.SET_SEARCH_PAGE:
      return {
        ...state,
        page: action.payload
      }
    default:
      return state
  }
}

const dashboardReducer = combineReducers({ trending, search })

export default dashboardReducer
