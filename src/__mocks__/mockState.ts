import { RootState } from 'src/store/index'
import { movieDetailsInitialState } from 'src/store/movieDetails/reducer'
import { personDetailsInitialState } from 'src/store/personDetails/reducer'

const mockState: RootState = {
  app: {
    _persist: {
      rehydrated: true,
      version: -1,
    },
    modal: {
      modalProps: null,
      modalType: null,
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
    isAuthenticated: false,
  },
  createdLists: {
    data: null,
    error: null,
    loading: true,
  },
  dashboard: {
    data: null,
    error: null,
    loading: true,
  },
  favorite: {
    data: null,
    error: null,
    loading: true,
  },
  listDetails: {
    data: null,
    error: null,
    loading: true,
  },
  movieDetails: movieDetailsInitialState,
  personDetails: personDetailsInitialState,
  watchlist: {
    data: null,
    error: null,
    loading: true,
  },
}

export default mockState
