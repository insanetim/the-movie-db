import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { IMovieDetailExtended } from 'src/interfaces/movie.interface'
import { RootState } from 'src/store'

import {
  changeMovieInFavorite,
  changeMovieInWatchlist,
  fetchMovieDetails,
} from './actions'
import { MovieDetailsState } from './types'

const movieDetailsAdapter = createEntityAdapter<IMovieDetailExtended>()

export const movieDetailsInitialState =
  movieDetailsAdapter.getInitialState<MovieDetailsState>({
    error: null,
    loading: true,
  })

const movieDetailsGlobalizedSelectors =
  movieDetailsAdapter.getSelectors<RootState>(state => state.movieDetails)

const movieDetailsSlice = createSlice({
  extraReducers(builder) {
    builder
      .addCase(fetchMovieDetails.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false
        movieDetailsAdapter.addOne(state, action.payload)
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(changeMovieInFavorite.pending, (state, action) => {
        const movie = movieDetailsAdapter
          .getSelectors()
          .selectById(state, action.meta.arg.movieId)
        if (movie) {
          movieDetailsAdapter.updateOne(state, {
            changes: {
              accountStates: {
                ...movie.accountStates,
                favorite: action.meta.arg.inFavorite,
              },
            },
            id: action.meta.arg.movieId,
          })
        }
      })
      .addCase(changeMovieInWatchlist.pending, (state, action) => {
        const movie = movieDetailsAdapter
          .getSelectors()
          .selectById(state, action.meta.arg.movieId)
        if (movie) {
          movieDetailsAdapter.updateOne(state, {
            changes: {
              accountStates: {
                ...movie.accountStates,
                watchlist: action.meta.arg.inWatchlist,
              },
            },
            id: action.meta.arg.movieId,
          })
        }
      })
  },
  initialState: movieDetailsInitialState,
  name: 'movieDetails',
  reducers: {},
  selectors: {
    movieDetailsErrorSelector: state => state.error,
    movieDetailsLoadingSelector: state => state.loading,
  },
})

export const { selectById: movieDetailsSelector } =
  movieDetailsGlobalizedSelectors

export const { movieDetailsErrorSelector, movieDetailsLoadingSelector } =
  movieDetailsSlice.selectors

export default movieDetailsSlice.reducer
