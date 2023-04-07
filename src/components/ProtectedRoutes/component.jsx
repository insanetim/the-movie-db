import { Outlet, Navigate } from 'react-router-dom'

import useContainer from './hook'

const ProtectedRoutes = () => {
  const { sessionId, location } = useContainer()

  return sessionId ? (
    <Outlet />
  ) : (
    <Navigate
      to='/login'
      replace
      state={{ from: location }}
    />
  )
}

export default ProtectedRoutes
