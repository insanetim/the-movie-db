import { createAsyncThunk } from '@reduxjs/toolkit'
import { IMoviesList } from 'src/interfaces/movie.interface'
import { getTrending, searchMovies } from 'src/libs/apiRoutes'
import errorMessage from 'src/utils/helpers/errorMessage'

import * as types from './constants'
import { FetchSearchProps } from './types'

const fetchTrending = createAsyncThunk<
  IMoviesList,
  string,
  { rejectValue: string }
>(types.fetchTrending, async function (page, { rejectWithValue }) {
  try {
    const movies = await getTrending({ page })

    return movies
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
    const movies = await searchMovies({ page, query })

    return movies
  } catch (error) {
    return rejectWithValue(errorMessage(error))
  }
})

export { fetchSearch, fetchTrending }
