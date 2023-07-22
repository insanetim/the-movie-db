import type { IMoviesList } from 'src/interfaces/movie.interface'

import { createAsyncThunk } from '@reduxjs/toolkit'
import { pathOr } from 'ramda'
import httpClient from 'src/lib/api/httpClient'
import { getTrending, searchMovies } from 'src/lib/apiRoutes'

import type { FetchSearchProps } from './types'

import * as types from './constants'

export const fetchTrending = createAsyncThunk(types.FETCH_TRENDING, async (page: string, { rejectWithValue }) => {
  try {
    const { data } = await httpClient.request<IMoviesList>({
      params: { page },
      url: getTrending
    })

    return data
  } catch (error) {
    const message = pathOr('Something went wrong!', ['response', 'data', 'status_message'], error)

    return rejectWithValue(message)
  }
})

export const fetchSearch = createAsyncThunk(
  types.FETCH_SEARCH,
  async ({ page, query }: FetchSearchProps, { rejectWithValue }) => {
    try {
      const { data } = await httpClient.request<IMoviesList>({
        params: { page, query },
        url: searchMovies
      })

      return data
    } catch (error) {
      const message = pathOr('Something went wrong!', ['response', 'data', 'status_message'], error)

      return rejectWithValue(message)
    }
  }
)
