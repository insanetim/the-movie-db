import { useLocation } from 'react-router-dom'
import { useAppSelector } from 'src/hooks/useRedux'
import { sessionIdSelector } from 'src/store/auth/selectors'

import { ProtectedRoutesHook } from './types'

const useContainer = (): ProtectedRoutesHook => {
  const sessionId = useAppSelector(sessionIdSelector)
  const location = useLocation()

  return { location, sessionId }
}

export default useContainer
