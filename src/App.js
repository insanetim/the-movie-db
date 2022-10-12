import React from 'react'
import { Route, Routes } from 'react-router-dom'

import ProtectedRoutes from './components/ProtectedRoutes'
import Layout from './layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Lists from './pages/Lists'
import StubsRoutes from './components/stubs'
import Watchlist from './pages/Watchlist'
import Favorites from './pages/Favorites'
import ListDetails from './pages/ListDetails'
import Movie from './pages/Movie'

const App = () => (
  <Routes>
    <Route element={<ProtectedRoutes />}>
      <Route
        path='/'
        element={<Layout />}
      >
        <Route
          index
          element={<Dashboard />}
        />
        <Route
          path='/lists'
          element={<Lists />}
        />
        <Route
          path='/watchlist'
          element={<Watchlist />}
        />
        <Route
          path='/favorites'
          element={<Favorites />}
        />
        <Route
          path='/list/:list_id'
          element={<ListDetails />}
        />
        <Route
          path='/movie/:movie_id'
          element={<Movie />}
        />
      </Route>
    </Route>
    <Route
      path='/login'
      element={<Login />}
    />
    <Route
      path='/stubs/*'
      element={<StubsRoutes />}
    />
  </Routes>
)

export default App
