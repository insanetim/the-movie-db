import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import ProtectedRoutes from './components/ProtectedRoutes'
import Layout from './layout'

export const Login = lazy(() => import('./pages/Login'))
export const Dashboard = lazy(() => import('./pages/Dashboard'))
export const Lists = lazy(() => import('./pages/Lists'))
export const Watchlist = lazy(() => import('./pages/Watchlist'))
export const Favorites = lazy(() => import('./pages/Favorites'))
export const ListDetails = lazy(() => import('./pages/ListDetails'))
export const Movie = lazy(() => import('./pages/Movie'))

const App = () => (
  <Suspense fallback={null}>
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route element={<Layout />}>
          <Route
            index
            element={<Dashboard />}
          />
          <Route
            path='/lists'
            element={<Lists />}
          />
          <Route
            path='/list/:listId'
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
  </Suspense>
)

export default App

export {}
