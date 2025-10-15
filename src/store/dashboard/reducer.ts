import { createAppSlice } from '../withTypes'
import { fetchSearch, fetchTrending } from './actions'
import { DashboardState } from './types'

const initialState: DashboardState = {
  data: null,
  error: null,
  loading: true,
}

const dashboardSlice = createAppSlice({
  extraReducers(builder) {
    builder
      .addCase(fetchTrending.pending, state => {
        state.loading = true
        state.data = null
        state.error = null
      })
      .addCase(fetchTrending.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchTrending.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(fetchSearch.pending, state => {
        state.loading = true
        state.data = null
        state.error = null
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchSearch.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
  initialState,
  name: 'dashboard',
  reducers: {},
  selectors: {
    dashboardErrorSelector: state => state.error,
    dashboardLoadingSelector: state => state.loading,
    dashboardMoviesSelector: state => state.data,
  },
})

export const {
  dashboardErrorSelector,
  dashboardLoadingSelector,
  dashboardMoviesSelector,
} = dashboardSlice.selectors

export default dashboardSlice.reducer
