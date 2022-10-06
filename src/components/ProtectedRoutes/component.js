import React from 'react'
import PropTypes from 'prop-types'
import { Outlet, Navigate, useLocation } from 'react-router-dom'

const ProtectedRoutes = ({ isAuthenticated }) => {
  const location = useLocation()
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate
      to='/login'
      replace
      state={{ from: location }}
    />
  )
}

ProtectedRoutes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

export default ProtectedRoutes
