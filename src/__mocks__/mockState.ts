import type { RootState } from 'src/store/index'

import { movieInitialState } from 'src/store/movie/reducer'

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
  movie: movieInitialState,
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
