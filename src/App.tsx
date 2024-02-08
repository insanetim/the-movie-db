import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import ModalRoot from 'src/components/ModalRoot/component'
import NotificationsRoot from 'src/components/NotificationsRoot'
import ProtectedRoutes from 'src/components/ProtectedRoutes'

export const Login = lazy(() => import('src/pages/Login'))
export const DefaultLayout = lazy(() => import('src/layouts/Default'))
export const Dashboard = lazy(() => import('src/pages/Dashboard'))
export const Lists = lazy(() => import('src/pages/Lists'))
export const Watchlist = lazy(() => import('src/pages/Watchlist'))
export const Favorite = lazy(() => import('src/pages/Favorite'))
export const ListDetails = lazy(() => import('src/pages/ListDetails'))
export const MovieDetails = lazy(() => import('src/pages/MovieDetails'))
export const NotFound = lazy(() => import('src/pages/NotFound'))

const App: React.FC = () => (
  <Suspense fallback={null}>
    <Routes>
      <Route
        element={<Login />}
        path='/login'
      />
      <Route element={<ProtectedRoutes />}>
        <Route
          element={<DefaultLayout />}
          path='/'
        >
          <Route
            element={<Dashboard />}
            index
          />
          <Route
            element={<Lists />}
            path='lists'
          />
          <Route
            element={<ListDetails />}
            path='list/:listSlug'
          />
          <Route
            element={<Watchlist />}
            path='watchlist'
          />
          <Route
            element={<Favorite />}
            path='favorite'
          />
          <Route
            element={<MovieDetails />}
            path='movie/:movieSlug'
          />
          <Route
            element={<NotFound />}
            path='*'
          />
        </Route>
      </Route>
    </Routes>
    <ModalRoot />
    <NotificationsRoot />
  </Suspense>
)

export default App
