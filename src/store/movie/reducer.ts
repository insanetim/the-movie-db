import type { IMovieDetailExtended } from 'src/interfaces/movie.interface'

import { createReducer } from '@reduxjs/toolkit'

import type { IMovieState } from './types'

import {
  changeMovieInFavorite,
  changeMovieInWatchlist,
  fetchMovie
} from './actions'

const initialState: IMovieState = {
  movieDetail: null
}

const movieReducer = createReducer(initialState, builder => {
  builder.addCase(fetchMovie.pending, state => {
    state.movieDetail = null
  })
  builder.addCase(fetchMovie.fulfilled, (state, action) => {
    state.movieDetail = action.payload as IMovieDetailExtended
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
