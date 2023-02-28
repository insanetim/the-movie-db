import { configureStore } from '@reduxjs/toolkit'
import { createLogicMiddleware } from 'redux-logic'

import httpClient from 'src/api/httpClient'
import rootReducer from './reducer'
import appOperations from '../app/operations'
import sessionOperations from '../session/operations'
import dashboardOperations from '../dashboard/operations'
import listsOperations from '../lists/operations'
import watchlistOperations from '../watchlist/operations'
import favoritesOperations from '../favorites/operations'
import movieOperations from '../movie/operations'

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
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: null
    }).concat(logicMiddleware),
  devTools: process.env.NODE_ENV !== 'production'
})

export default store
