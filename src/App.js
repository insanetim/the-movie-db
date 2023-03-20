import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ProtectedRoutes from './components/ProtectedRoutes'
import Layout from './layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Lists from './pages/Lists'
import Watchlist from './pages/Watchlist'
import Favorites from './pages/Favorites'
import ListDetails from './pages/ListDetails'
import Movie from './pages/Movie'
import './assets/styles/app.scss'

const App = () => (
  <BrowserRouter>
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
            path='/list/:listId'
            element={<ListDetails />}
          />
          <Route
            path='/movie/:movieId'
            element={<Movie />}
          />
        </Route>
      </Route>
      <Route
        path='/login'
        element={<Login />}
      />
    </Routes>
  </BrowserRouter>
)

export default App
