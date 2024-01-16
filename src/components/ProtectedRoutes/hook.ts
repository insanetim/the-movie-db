import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { isAuthenticatedSelector } from 'src/store/auth/selectors'

import { ProtectedRoutesHookReturn } from './types'

const useContainer = (): ProtectedRoutesHookReturn => {
  const isAuthenticated = useSelector(isAuthenticatedSelector)
  const location = useLocation()

  return { isAuthenticated, location }
}

export default useContainer
