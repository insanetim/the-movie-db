import { combineReducers } from '@reduxjs/toolkit'

import * as types from './types'

const listsInitialState = {
  lists: {},
  page: 1,
  loading: true,
  error: null
}

export const lists = (state = listsInitialState, action) => {
  switch (action.type) {
    case types.FETCH_LISTS_REQUEST:
      return {
        lists: {},
        page: action.payload,
        loading: true,
        error: null
      }
    case types.FETCH_LISTS_SUCCESS:
      return {
        ...state,
        lists: action.payload,
        loading: false,
        error: null
      }
    case types.FETCH_LISTS_FAILURE:
      return {
        lists: {},
        page: 1,
        loading: false,
        error: action.payload
      }
    case types.SET_LISTS_PAGE:
      return {
        ...state,
        page: action.payload
      }
    default:
      return state
  }
}

const listInitialState = {
  list: {},
  loading: true,
  error: null
}

export const list = (state = listInitialState, action) => {
  switch (action.type) {
    case types.FETCH_LIST_REQUEST:
      return {
        list: {},
        loading: true,
        error: null
      }
    case types.FETCH_LIST_SUCCESS:
      return {
        list: action.payload,
        loading: false,
        error: null
      }
    case types.FETCH_LIST_FAILURE:
      return {
        list: {},
        loading: false,
        error: action.payload
      }
    default:
      return state
  }
}

const listsReducer = combineReducers({ lists, list })

export default listsReducer
