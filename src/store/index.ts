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

export type RootState = ReturnType<typeof rootReducer>

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
      }),
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
