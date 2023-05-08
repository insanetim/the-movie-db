import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import ProtectedRoutes from 'src/components/ProtectedRoutes'
import Layout from 'src/components/Layout'
import ModalRoot from './components/ModalRoot/component'
import NotificationsRoot from './components/NotificationsRoot'

export const Login = lazy(() => import('src/pages/Login'))
export const Dashboard = lazy(() => import('src/pages/Dashboard'))
export const Lists = lazy(() => import('src/pages/Lists'))
export const Watchlist = lazy(() => import('src/pages/Watchlist'))
export const Favorite = lazy(() => import('src/pages/Favorite'))
export const ListDetail = lazy(() => import('src/pages/ListDetail'))
export const MovieDetail = lazy(() => import('src/pages/MovieDetail'))

const App: React.FC = () => (
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
            element={<ListDetail />}
          />
          <Route
            path='/watchlist'
            element={<Watchlist />}
          />
          <Route
            path='/favorite'
            element={<Favorite />}
          />

          <Route
            path='/movie/:movieId'
            element={<MovieDetail />}
          />
        </Route>
      </Route>
      <Route
        path='/login'
        element={<Login />}
      />
    </Routes>
    <ModalRoot />
    <NotificationsRoot />
  </Suspense>
)

export default App
