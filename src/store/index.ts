import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import appReducer from './app'
import { showModal } from './app/actions'
import dashboardReducer from './dashboard'
import favoriteReducer from './favorite'
import listsReducer from './lists'
import movieReducer from './movie'
import sessionReducer from './session'
import watchlistReducer from './watchlist'

const sessionPersistConfig = {
  key: 'session',
  storage,
  whitelist: ['account'],
}

const rootReducer = combineReducers({
  app: appReducer,
  dashboard: dashboardReducer,
  favorite: favoriteReducer,
  lists: listsReducer,
  movie: movieReducer,
  session: persistReducer(sessionPersistConfig, sessionReducer),
  watchlist: watchlistReducer,
})

export const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [showModal.type],
      },
    }),
  reducer: rootReducer,
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
