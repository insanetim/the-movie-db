import { useLocation } from 'react-router-dom'
import { selectSessionId } from 'src/store/features/auth'
import { useAppSelector } from 'src/store/hooks'

import { ProtectedRoutesHookReturn } from './types'

const useContainer = (): ProtectedRoutesHookReturn => {
  const location = useLocation()
  const sessionId = useAppSelector(selectSessionId)

  return { location, sessionId }
}

export default useContainer
