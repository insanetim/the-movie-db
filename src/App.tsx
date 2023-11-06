import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import ModalRoot from 'src/components/ModalRoot/component'
import NotificationsRoot from 'src/components/NotificationsRoot'
import ProtectedRoutes from 'src/components/ProtectedRoutes'

export const Layout = lazy(() => import('src/components/Layout'))
export const Login = lazy(() => import('src/pages/Login'))
export const Dashboard = lazy(() => import('src/pages/Dashboard'))
export const Lists = lazy(() => import('src/pages/Lists'))
export const Watchlist = lazy(() => import('src/pages/Watchlist'))
export const Favorite = lazy(() => import('src/pages/Favorite'))
export const ListDetail = lazy(() => import('src/pages/ListDetail'))
export const MovieDetail = lazy(() => import('src/pages/MovieDetail'))
export const NotFound = lazy(() => import('src/pages/NotFound'))

const App: React.FC = () => (
  <Suspense fallback={null}>
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route
          element={<Layout />}
          path='/'
        >
          <Route
            element={<Dashboard />}
            index
          />
          <Route
            element={<Lists />}
            path='/lists'
          />
          <Route
            element={<ListDetail />}
            path='/list/:listId'
          />
          <Route
            element={<Watchlist />}
            path='/watchlist'
          />
          <Route
            element={<Favorite />}
            path='/favorite'
          />
          <Route
            element={<MovieDetail />}
            path='/movie/:movieId'
          />
          <Route
            element={<NotFound />}
            path='*'
          />
        </Route>
      </Route>
      <Route
        element={<Login />}
        path='/login'
      />
    </Routes>
    <ModalRoot />
    <NotificationsRoot />
  </Suspense>
)

export default App
