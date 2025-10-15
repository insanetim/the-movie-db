import { createAppSlice } from '../withTypes'
import { fetchLists } from './actions'
import { CreatedListsState } from './types'

const initialState: CreatedListsState = {
  data: null,
  error: null,
  loading: true,
}

const createdListsSlice = createAppSlice({
  extraReducers(builder) {
    builder
      .addCase(fetchLists.pending, state => {
        state.loading = true
        state.data = null
        state.error = null
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
  initialState: initialState,
  name: 'createdLists',
  reducers: {},
  selectors: {
    createdListsErrorSelector: state => state.error,
    createdListsLoadingSelector: state => state.loading,
    createdListsSelector: state => state.data,
  },
})

export const {
  createdListsErrorSelector,
  createdListsLoadingSelector,
  createdListsSelector,
} = createdListsSlice.selectors

export default createdListsSlice.reducer
