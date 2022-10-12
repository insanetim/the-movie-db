import { useEffect } from 'react'
import * as Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'

import { requestAccount, setSession } from 'src/store/actions'

export const useContainer = () => {
  const dispatch = useDispatch()
  const sessionId = Cookies.get('session_id')

  useEffect(() => {
    dispatch(setSession(sessionId || ''))
    if (sessionId) {
      dispatch(requestAccount())
    }
  }, [sessionId])

  return { sessionId }
}
