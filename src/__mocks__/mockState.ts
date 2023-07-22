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
    movies: null
  },
  favorite: {
    movies: null
  },
  lists: {
    createdLists: {
      lists: null
    },
    listDetail: {
      list: null
    }
  },
  movie: {
    movieDetail: null
  },
  session: {
    account: null,
    loading: false,
    sessionId: ''
  },
  watchlist: {
    movies: null
  }
}

export default mockState
