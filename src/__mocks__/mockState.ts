import { RootState } from '../store/index'

const mockState: RootState = {
  app: {
    modal: {
      modalProps: null,
      modalType: null
    },
    notifications: []
  },
  dashboard: {
    error: null,
    loading: true,
    movies: null
  },
  favorite: {
    error: null,
    loading: true,
    movies: null
  },
  lists: {
    createdLists: {
      error: null,
      lists: null,
      loading: true
    },
    listDetail: {
      error: null,
      list: null,
      loading: true
    }
  },
  movie: {
    error: null,
    loading: true,
    movieDetail: null
  },
  session: {
    account: null,
    loading: false,
    sessionId: ''
  },
  watchlist: {
    error: null,
    loading: true,
    movies: null
  }
}

export default mockState
