import React from 'react'
import PropTypes from 'prop-types'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoutes = ({ isAuthenticated }) => (isAuthenticated ? <Outlet /> : <Navigate to='/login' />)

ProtectedRoutes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

export default ProtectedRoutes
