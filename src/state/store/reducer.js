import { combineReducers } from 'redux'

import appReducer from '../app'
import sessionReducer from '../session'
import dashboardReducer from '../dashboard'
import listsReducer from '../lists'
import watchlistReducer from '../watchlist'
import favoritesReducer from '../favorites'
import movieReducer from '../movie'

const rootReducer = combineReducers({
  app: appReducer,
  session: sessionReducer,
  dashboard: dashboardReducer,
  lists: listsReducer,
  watchlist: watchlistReducer,
  favorites: favoritesReducer,
  movie: movieReducer
})

export default rootReducer
