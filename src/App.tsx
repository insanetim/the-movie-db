import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
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
export const Cast = lazy(() => import('src/pages/Cast'))
export const PersonDetails = lazy(() => import('src/pages/PersonDetails'))
export const Credits = lazy(() => import('src/pages/Credits'))
export const NotFound = lazy(() => import('src/pages/NotFound'))

const App: React.FC = () => (
  <Suspense fallback={null}>
    <Routes>
      <Route
        element={<Login />}
        path='/login'
      />

      <Route
        element={<DefaultLayout />}
        path='/'
      >
        <Route
          element={<Dashboard />}
          index
        />
        <Route path='movie/:movieSlug'>
          <Route
            element={<MovieDetails />}
            index
          />
          <Route
            element={<Cast />}
            path='cast'
          />
        </Route>
        <Route path='person/:personSlug'>
          <Route
            element={<PersonDetails />}
            index
          />
          <Route
            element={<Credits />}
            path='credits'
          />
        </Route>
        <Route
          element={<NotFound />}
          path='*'
        />

        <Route element={<ProtectedRoutes />}>
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
        </Route>
      </Route>
    </Routes>
    <NotificationsRoot />
  </Suspense>
)

export default App
