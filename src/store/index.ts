import { configureStore } from '@reduxjs/toolkit'

import appReducer from './app'
import sessionReducer from './session'
import dashboardReducer from './dashboard'
import listsReducer from './lists'
import watchlistReducer from './watchlist'
import favoriteReducer from './favorite'
import movieReducer from './movie'

const store = configureStore({
  reducer: {
    app: appReducer,
    session: sessionReducer,
    dashboard: dashboardReducer,
    lists: listsReducer,
    watchlist: watchlistReducer,
    favorite: favoriteReducer,
    movie: movieReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
