import { createEntityAdapter, createReducer } from '@reduxjs/toolkit'
import { IMovieDetailExtended } from 'src/interfaces/movie.interface'
import { RootState } from 'src/store'

import {
  changeMovieInFavorite,
  changeMovieInWatchlist,
  fetchMovieDetail,
} from './actions'

const movieAdapter = createEntityAdapter<IMovieDetailExtended>()

const movieInitialState = movieAdapter.getInitialState()

const movieGlobalizedSelectors = movieAdapter.getSelectors<RootState>(
  state => state.movie
)

const movieReducer = createReducer(movieInitialState, builder => {
  builder
    .addCase(fetchMovieDetail.fulfilled, (state, action) => {
      movieAdapter.addOne(state, action.payload)
    })
    .addCase(changeMovieInFavorite.pending, (state, action) => {
      const movie = movieAdapter
        .getSelectors()
        .selectById(state, action.meta.arg.movieId)
      if (movie) {
        movieAdapter.updateOne(state, {
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
      const movie = movieAdapter
        .getSelectors()
        .selectById(state, action.meta.arg.movieId)
      if (movie) {
        movieAdapter.updateOne(state, {
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
})

export { movieGlobalizedSelectors, movieInitialState }

export default movieReducer
