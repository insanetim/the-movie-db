import { RootState } from '../store/index'

const mockState: RootState = {
  app: {
    modal: {
      modalType: null,
      modalProps: null
    },
    notifications: []
  },
  session: {
    sessionId: '',
    account: null,
    loading: false
  },
  dashboard: {
    trending: {
      movies: null,
      page: 1,
      loading: true,
      error: null
    },
    search: {
      movies: null,
      page: 1,
      loading: true,
      error: null
    }
  },
  lists: {
    createdLists: {
      lists: null,
      loading: true,
      error: null
    },
    listDetail: {
      list: null,
      loading: true,
      error: null
    }
  },
  watchlist: {
    movies: null,
    loading: true,
    error: null
  },
  favorite: {
    movies: null,
    loading: true,
    error: null
  },
  movie: {
    movieDetail: null,
    loading: true,
    error: null
  }
}

export default mockState
