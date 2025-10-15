import { createAppSlice } from '../withTypes'
import { fetchWatchlist } from './actions'
import { WatchlistState } from './types'

const initialState: WatchlistState = {
  data: null,
  error: null,
  loading: true,
}

const watchlistSlice = createAppSlice({
  extraReducers(builder) {
    builder
      .addCase(fetchWatchlist.pending, state => {
        state.loading = true
        state.data = null
        state.error = null
      })
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchWatchlist.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
  initialState,
  name: 'watchlist',
  reducers: {},
  selectors: {
    watchlistErrorSelector: state => state.error,
    watchlistLoadingSelector: state => state.loading,
    watchlistMoviesSelector: state => state.data,
  },
})

export const {
  watchlistErrorSelector,
  watchlistLoadingSelector,
  watchlistMoviesSelector,
} = watchlistSlice.selectors

export default watchlistSlice.reducer
