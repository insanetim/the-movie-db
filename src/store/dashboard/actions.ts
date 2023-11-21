import { createAsyncThunk } from '@reduxjs/toolkit'
import { IMoviesList } from 'src/interfaces/movie.interface'
import httpClient from 'src/lib/api/httpClient'
import { getTrending, searchMovies } from 'src/lib/apiRoutes'
import errorMessage from 'src/utils/helpers/errorMessage'

import * as types from './constants'
import { FetchSearchProps } from './types'

const fetchTrending = createAsyncThunk<
  IMoviesList,
  string,
  { rejectValue: string }
>(types.fetchTrending, async function (page, { rejectWithValue }) {
  try {
    const { data } = await httpClient.request<IMoviesList>({
      params: { page },
      url: getTrending
    })

    return data
  } catch (error) {
    return rejectWithValue(errorMessage(error))
  }
})

const fetchSearch = createAsyncThunk<
  IMoviesList,
  FetchSearchProps,
  { rejectValue: string }
>(types.fetchSearch, async function ({ page, query }, { rejectWithValue }) {
  try {
    const { data } = await httpClient.request<IMoviesList>({
      params: { page, query },
      url: searchMovies
    })

    return data
  } catch (error) {
    return rejectWithValue(errorMessage(error))
  }
})

export { fetchSearch, fetchTrending }
