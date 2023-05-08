import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { pathOr } from 'ramda'

import httpClient from 'src/lib/api/httpClient'
import { getTrending, searchMovies } from 'src/lib/apiRoutes'
import type { IMoviesList } from 'src/interfaces/movie.interface'
import type { FetchSearchProps } from './types'
import * as types from './constants'

export const fetchTrending = createAsyncThunk(
  types.FETCH_TRENDING,
  async (page: number, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await httpClient.request<IMoviesList>({
        url: getTrending,
        params: { page }
      })

      return fulfillWithValue(data)
    } catch (error) {
      const message = pathOr('Something went wrong!', ['message'], error)

      return rejectWithValue(message)
    }
  }
)

export const fetchSearch = createAsyncThunk(
  types.FETCH_SEARCH,
  async ({ page, query }: FetchSearchProps, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await httpClient.request<IMoviesList>({
        url: searchMovies,
        params: { page, query }
      })

      return fulfillWithValue(data)
    } catch (error) {
      const message = pathOr('Something went wrong!', ['message'], error)

      return rejectWithValue(message)
    }
  }
)

export const setTrendingPage = createAction<number>(types.SET_TRENDING_PAGE)

export const setSearchPage = createAction<number>(types.SET_SEARCH_PAGE)
