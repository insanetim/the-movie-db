import { Outlet, Navigate } from 'react-router-dom'

import useContainer from './hook'

const ProtectedRoutes: React.FC = () => {
  const { sessionId, location } = useContainer()

  return (
    <>
      {sessionId.length > 0 ? (
        <Outlet />
      ) : (
        <Navigate
          to='/login'
          replace
          state={{ from: location }}
        />
      )}
    </>
  )
}

export default ProtectedRoutes
