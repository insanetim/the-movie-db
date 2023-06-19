import { Navigate, Outlet } from 'react-router-dom'

import useContainer from './hook'

const ProtectedRoutes: React.FC = () => {
  const { location, sessionId } = useContainer()

  return (
    <>
      {sessionId.length > 0 ? (
        <Outlet />
      ) : (
        <Navigate
          replace
          state={{ from: location }}
          to='/login'
        />
      )}
    </>
  )
}

export default ProtectedRoutes
