import { Navigate, Outlet } from 'react-router-dom'

import useContainer from './hook'

const ProtectedRoutes: React.FC = () => {
  const { isAuthenticated, location } = useContainer()

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate
      replace
      state={{ from: location }}
      to='/login'
    />
  )
}

export default ProtectedRoutes
