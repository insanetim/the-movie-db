import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Cookies from 'js-cookie'

import { fetchAccount, setSession } from 'src/state/session/actions'

const useContainer = () => {
  const dispatch = useDispatch()
  const sessionId = Cookies.get('session_id') || null

  useEffect(() => {
    dispatch(setSession(sessionId))
    if (sessionId) {
      dispatch(fetchAccount())
    }
  }, [sessionId])

  return { sessionId }
}

export default useContainer
