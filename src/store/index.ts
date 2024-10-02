import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
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
import personDetailsReducer from './personDetails'
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
  personDetails: personDetailsReducer,
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

// Infer the type of `store`
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch
// Same for the `RootState` type
export type RootState = ReturnType<typeof store.getState>
// Export a reusable type for handwritten thunks
export type AppThunk = ThunkAction<void, RootState, unknown, Action>
