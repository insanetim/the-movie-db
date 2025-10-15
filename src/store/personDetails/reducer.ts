import { createEntityAdapter } from '@reduxjs/toolkit'
import { IPersonDetails } from 'src/interfaces/person.interface'
import { RootState } from 'src/store'

import { createAppSlice } from '../withTypes'
import { fetchPersonDetails } from './actions'
import { PersonDetailsState } from './types'

const personDetailsAdapter = createEntityAdapter<IPersonDetails>()

export const personDetailsInitialState =
  personDetailsAdapter.getInitialState<PersonDetailsState>({
    error: null,
    loading: true,
  })

const personDetailsSlice = createAppSlice({
  extraReducers(builder) {
    builder
      .addCase(fetchPersonDetails.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPersonDetails.fulfilled, (state, action) => {
        state.loading = false
        personDetailsAdapter.setOne(state, action.payload)
      })
      .addCase(fetchPersonDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
  initialState: personDetailsInitialState,
  name: 'personDetails',
  reducers: {},
  selectors: {
    personDetailsErrorSelector: state => state.error,
    personDetailsLoadingSelector: state => state.loading,
  },
})

export const { selectById: personDetailsSelector } =
  personDetailsAdapter.getSelectors<RootState>(state => state.personDetails)

export const { personDetailsErrorSelector, personDetailsLoadingSelector } =
  personDetailsSlice.selectors

export default personDetailsSlice.reducer
