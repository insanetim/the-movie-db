import { useLocation } from 'react-router-dom'
import { useAppSelector } from 'src/hooks/useRedux'
import { isAuthenticatedSelector } from 'src/store/auth/selectors'

import { ProtectedRoutesHook } from './types'

const useContainer = (): ProtectedRoutesHook => {
  const isAuthenticated = useAppSelector(isAuthenticatedSelector)
  const location = useLocation()

  return { isAuthenticated, location }
}

export default useContainer
