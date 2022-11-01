import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'

import { fetchAccount, setSession } from 'src/state/session/actions'

export const useContainer = () => {
  const dispatch = useDispatch()
  const sessionId = Cookies.get('session_id')

  useEffect(() => {
    dispatch(setSession(sessionId || null))
    if (sessionId) {
      dispatch(fetchAccount())
    }
  }, [sessionId])

  return { sessionId }
}
