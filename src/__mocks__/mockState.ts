import { apiSlice } from 'src/store/api/apiSlice'
import { RootState } from 'src/store/index'

const apiInitialState = apiSlice.reducer(undefined, { type: 'api/INIT' })

const mockState: RootState = {
  [apiSlice.reducerPath]: apiInitialState,
  app: {
    _persist: {
      rehydrated: true,
      version: -1,
    },
    notifications: [],
    theme: 'light',
  },
  auth: {
    _persist: {
      rehydrated: true,
      version: -1,
    },
    account: null,
    sessionId: null,
  },
}

export default mockState
