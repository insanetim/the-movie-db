import { createReducer } from '@reduxjs/toolkit'

import type { IMovieDetailExtended } from 'src/interfaces/movie.interface'
import type { IMovieState } from './types'
import { changeMovieInFavorite, changeMovieInWatchlist, fetchMovie } from './actions'

const initialState: IMovieState = {
  movieDetail: null,
  loading: true,
  error: null
}

const movieReducer = createReducer(initialState, builder => {
  builder.addCase(fetchMovie.pending, state => {
    state.movieDetail = null
    state.loading = true
    state.error = null
  })
  builder.addCase(fetchMovie.fulfilled, (state, action) => {
    state.movieDetail = action.payload as IMovieDetailExtended
    state.loading = false
  })
  builder.addCase(fetchMovie.rejected, (state, action) => {
    state.error = action.payload as string
    state.loading = false
  })
  builder.addCase(changeMovieInFavorite.fulfilled, (state, action) => {
    if (state.movieDetail) {
      state.movieDetail.accountStates.favorite = action.meta.arg.inFavorite
    }
  })
  builder.addCase(changeMovieInWatchlist.fulfilled, (state, action) => {
    if (state.movieDetail) {
      state.movieDetail.accountStates.watchlist = action.meta.arg.inWatchlist
    }
  })
})

export default movieReducer
