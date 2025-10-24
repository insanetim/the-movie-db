import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
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
import { appReducer } from './features/app'
import { authReducer } from './features/auth'

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
})

export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
        },
      }).concat(apiSlice.middleware),
    preloadedState,
    reducer: rootReducer,
  })

export const store = setupStore()
export const persistor = persistStore(store)

setupListeners(store.dispatch)

export type AppDispatch = AppStore['dispatch']
export type AppStore = typeof store
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
export type RootState = ReturnType<typeof rootReducer>
