import { apiSlice } from 'src/store/api/apiSlice'
import { RootState } from 'src/store/index'

const mockState: RootState = {
  [apiSlice.reducerPath]: {
    config: {
      focused: true,
      middlewareRegistered: true,
      online: true,
    },
    mutations: {},
    provided: {},
    queries: {},
    subscriptions: {},
  } as ReturnType<typeof apiSlice.reducer>,
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
