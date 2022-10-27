import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'

import { requestAccount, setSession } from 'src/state/session/actions'

export const useContainer = () => {
  const dispatch = useDispatch()
  const sessionId = Cookies.get('session_id')

  useEffect(() => {
    dispatch(setSession(sessionId || null))
    if (sessionId) {
      dispatch(requestAccount())
    }
  }, [sessionId])

  return { sessionId }
}
