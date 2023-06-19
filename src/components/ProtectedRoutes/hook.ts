import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { fetchAccount } from 'src/store/session/actions'
import { sessionIdSelector } from 'src/store/session/selectors'

import type { ProtectedRoutesHook } from './types'

const useContainer = (): ProtectedRoutesHook => {
  const dispatch = useAppDispatch()
  const sessionId = useAppSelector(sessionIdSelector)
  const location = useLocation()

  useEffect(() => {
    if (sessionId.length > 0) {
      dispatch(fetchAccount())
    }
  }, [dispatch, sessionId])

  return { location, sessionId }
}

export default useContainer
