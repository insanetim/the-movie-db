import { useLocation } from 'react-router-dom'
import { isAuthenticatedSelector } from 'src/store/auth/selectors'
import { useAppSelector } from 'src/store/hooks'

import { ProtectedRoutesHookReturn } from './types'

const useContainer = (): ProtectedRoutesHookReturn => {
  const isAuthenticated = useAppSelector(isAuthenticatedSelector)
  const location = useLocation()

  return { isAuthenticated, location }
}

export default useContainer
