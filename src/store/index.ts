import { configureStore } from '@reduxjs/toolkit'

import appReducer from './app'
import { showModal } from './app/actions'
import dashboardReducer from './dashboard'
import favoriteReducer from './favorite'
import listsReducer from './lists'
import movieReducer from './movie'
import sessionReducer from './session'
import watchlistReducer from './watchlist'

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [showModal.type]
      }
    }),
  reducer: {
    app: appReducer,
    dashboard: dashboardReducer,
    favorite: favoriteReducer,
    lists: listsReducer,
    movie: movieReducer,
    session: sessionReducer,
    watchlist: watchlistReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
