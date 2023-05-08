import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { sessionIdSelector } from 'src/store/session/selectors'
import { fetchAccount } from 'src/store/session/actions'
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

  return { sessionId, location }
}

export default useContainer
