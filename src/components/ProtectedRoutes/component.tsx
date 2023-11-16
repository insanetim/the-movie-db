import { isEmpty } from 'ramda'
import { Navigate, Outlet } from 'react-router-dom'

import useContainer from './hook'

const ProtectedRoutes: React.FC = () => {
  const { location, sessionId } = useContainer()

  return (
    <>
      {isEmpty(sessionId) ? (
        <Navigate
          replace
          state={{ from: location }}
          to='/login'
        />
      ) : (
        <Outlet />
      )}
    </>
  )
}

export default ProtectedRoutes
