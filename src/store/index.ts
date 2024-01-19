import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import appReducer from './app'
import { showModal } from './app/actions'
import authReducer from './auth'
import createdListsReducer from './createdLists'
import dashboardReducer from './dashboard'
import favoriteReducer from './favorite'
import listDetailsReducer from './listDetails'
import movieDetailsReducer from './movieDetails'
import watchlistReducer from './watchlist'

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['account'],
}

const rootReducer = combineReducers({
  app: appReducer,
  auth: persistReducer(authPersistConfig, authReducer),
  createdLists: createdListsReducer,
  dashboard: dashboardReducer,
  favorite: favoriteReducer,
  listDetails: listDetailsReducer,
  movieDetails: movieDetailsReducer,
  watchlist: watchlistReducer,
})

export const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          REHYDRATE,
          showModal.type,
        ],
      },
    }),
  reducer: rootReducer,
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
