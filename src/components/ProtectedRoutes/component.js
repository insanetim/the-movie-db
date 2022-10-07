import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'

import { useContainer } from './hook'

const ProtectedRoutes = () => {
  const location = useLocation()
  const { sessionId } = useContainer()

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
