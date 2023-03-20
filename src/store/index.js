import { configureStore } from '@reduxjs/toolkit'
import { createLogicMiddleware } from 'redux-logic'

import httpClient from 'src/api/httpClient'
import appReducer from './app'
import sessionReducer from './session'
import dashboardReducer from './dashboard'
import listsReducer from './lists'
import watchlistReducer from './watchlist'
import favoritesReducer from './favorites'
import movieReducer from './movie'
import appOperations from './app/operations'
import sessionOperations from './session/operations'
import dashboardOperations from './dashboard/operations'
import listsOperations from './lists/operations'
import watchlistOperations from './watchlist/operations'
import favoritesOperations from './favorites/operations'
import movieOperations from './movie/operations'

const operations = [
  ...appOperations,
  ...sessionOperations,
  ...dashboardOperations,
  ...listsOperations,
  ...watchlistOperations,
  ...favoritesOperations,
  ...movieOperations
]
const operationsDependencies = { httpClient }
const logicMiddleware = createLogicMiddleware(operations, operationsDependencies)

const store = configureStore({
  reducer: {
    app: appReducer,
    session: sessionReducer,
    dashboard: dashboardReducer,
    lists: listsReducer,
    watchlist: watchlistReducer,
    favorites: favoritesReducer,
    movie: movieReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logicMiddleware),
  devTools: process.env.NODE_ENV !== 'production'
})

export default store
