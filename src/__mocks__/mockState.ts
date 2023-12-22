import { RootState } from 'src/store/index'
import { movieInitialState } from 'src/store/movie/reducer'

const mockState: RootState = {
  app: {
    modal: {
      modalProps: null,
      modalType: null,
    },
    notifications: [],
  },
  dashboard: {
    data: null,
  },
  favorite: {
    data: null,
    error: null,
    loading: true,
  },
  lists: {
    createdLists: {
      data: null,
      error: null,
      loading: true,
    },
    listDetail: {
      data: null,
      error: null,
      loading: true,
    },
  },
  movie: movieInitialState,
  session: {
    _persist: {
      rehydrated: true,
      version: -1,
    },
    account: null,
    loading: false,
    sessionId: '',
  },
  watchlist: {
    data: null,
    error: null,
    loading: true,
  },
}

export default mockState
