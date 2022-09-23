import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'

import Dashboard from './Dashboard'
import DashboardEmpty from './DashboardEmpty'
import DashboardLoading from './DashboardLoading'
import Favorites from './Favorites'
import ListDetails from './ListDetails'
import Lists from './Lists'
import Login from './Login'
import Movie from './Movie'
import Watchlist from './Watchlist'

const Links = () => (
  <nav>
    <div>
      <Link to='/stubs/login'>Login</Link>
    </div>
    <div>
      <Link to='/stubs/dashboard'>Dashboard with content</Link>
    </div>
    <div>
      <Link to='/stubs/dashboard-empty'>Dashboard empty</Link>
    </div>
    <div>
      <Link to='/stubs/dashboard-loading'>Dashboard loading</Link>
    </div>
    <div>
      <Link to='/stubs/movie'>Movie</Link>
    </div>
    <div>
      <Link to='/stubs/lists'>Lists</Link>
    </div>
    <div>
      <Link to='/stubs/list/details'>List Details</Link>
    </div>
    <div>
      <Link to='/stubs/watchlist'>Watchlist</Link>
    </div>
    <div>
      <Link to='/stubs/favorites'>Favorites</Link>
    </div>
  </nav>
)

const StubsRoutes = () => (
  <Routes>
    <Route
      path='/'
      element={<Links />}
    />
    <Route
      path='/login'
      element={<Login />}
    />
    <Route
      path='/dashboard'
      element={<Dashboard />}
    />
    <Route
      path='/dashboard-empty'
      element={<DashboardEmpty />}
    />
    <Route
      path='/dashboard-loading'
      element={<DashboardLoading />}
    />
    <Route
      path='/movie'
      element={<Movie />}
    />
    <Route
      path='/lists'
      element={<Lists />}
    />
    <Route
      path='/list/details'
      element={<ListDetails />}
    />
    <Route
      path='/watchlist'
      element={<Watchlist />}
    />
    <Route
      path='/favorites'
      element={<Favorites />}
    />
  </Routes>
)

export default StubsRoutes
