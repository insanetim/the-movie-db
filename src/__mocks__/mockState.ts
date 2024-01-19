import { RootState } from 'src/store/index'
import { movieDetailsInitialState } from 'src/store/movieDetails/reducer'

const mockState: RootState = {
  app: {
    modal: {
      modalProps: null,
      modalType: null,
    },
    notifications: [],
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
  watchlist: {
    data: null,
    error: null,
    loading: true,
  },
}

export default mockState
