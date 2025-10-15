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

import { apiSlice } from './api'
import createdListsReducer from './createdLists'
import dashboardReducer from './dashboard'
import favoriteReducer from './favorite'
import { appReducer, showModal } from './features/app'
import { authReducer } from './features/auth'
import listDetailsReducer from './listDetails'
import movieDetailsReducer from './movieDetails'
import personDetailsReducer from './personDetails'
import watchlistReducer from './watchlist'

const appPersistConfig = {
  key: 'app',
  storage,
  whitelist: ['theme'],
}

const authPersistConfig = {
  key: 'auth',
  storage,
}

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  app: persistReducer(appPersistConfig, appReducer),
  auth: persistReducer(authPersistConfig, authReducer),
  createdLists: createdListsReducer,
  dashboard: dashboardReducer,
  favorite: favoriteReducer,
  listDetails: listDetailsReducer,
  movieDetails: movieDetailsReducer,
  personDetails: personDetailsReducer,
  watchlist: watchlistReducer,
})

export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
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
      }).concat(apiSlice.middleware),
    preloadedState,
    reducer: rootReducer,
  })

export const store = setupStore()
export const persistor = persistStore(store)

export type AppDispatch = AppStore['dispatch']
export type AppStore = typeof store
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
export type RootState = ReturnType<typeof rootReducer>
