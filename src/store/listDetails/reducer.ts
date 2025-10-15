import { createAppSlice } from '../withTypes'
import { fetchListDetails } from './actions'
import { ListDetailsState } from './types'

const initialState: ListDetailsState = {
  data: null,
  error: null,
  loading: true,
}

const listDetailsSlice = createAppSlice({
  extraReducers(builder) {
    builder
      .addCase(fetchListDetails.pending, state => {
        state.loading = true
        state.data = null
        state.error = null
      })
      .addCase(fetchListDetails.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchListDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
  initialState: initialState,
  name: 'listDetails',
  reducers: {},
  selectors: {
    listDetailsErrorSelector: state => state.error,
    listDetailsLoadingSelector: state => state.loading,
    listDetailsSelector: state => state.data,
  },
})

export const {
  listDetailsErrorSelector,
  listDetailsLoadingSelector,
  listDetailsSelector,
} = listDetailsSlice.selectors

export default listDetailsSlice.reducer
