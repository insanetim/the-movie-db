import type { IMoviesList } from 'src/interfaces/movie.interface'

import { createAsyncThunk } from '@reduxjs/toolkit'
import httpClient from 'src/lib/api/httpClient'
import { getTrending, searchMovies } from 'src/lib/apiRoutes'
import errorMessage from 'src/utils/helpers/errorMessage'

import type { FetchSearchProps } from './types'

import * as types from './constants'

const fetchTrending = createAsyncThunk(
  types.fetchTrending,
  async function (page: string, { rejectWithValue }) {
    try {
      const { data } = await httpClient.request<IMoviesList>({
        params: { page },
        url: getTrending
      })

      return data
    } catch (error) {
      return rejectWithValue(errorMessage(error))
    }
  }
)

const fetchSearch = createAsyncThunk(
  types.fetchSearch,
  async function ({ page, query }: FetchSearchProps, { rejectWithValue }) {
    try {
      const { data } = await httpClient.request<IMoviesList>({
        params: { page, query },
        url: searchMovies
      })

      return data
    } catch (error) {
      return rejectWithValue(errorMessage(error))
    }
  }
)

export { fetchSearch, fetchTrending }
