import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'

import { useContainer } from './hook'

const ProtectedRoutes = () => {
  const { sessionId } = useContainer()
  const location = useLocation()

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
