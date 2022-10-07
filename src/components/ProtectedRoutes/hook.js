import { useEffect } from 'react'
import * as Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'

import { setSession } from 'src/store/actions'

export const useContainer = () => {
  const sessionId = Cookies.get('session_id')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSession(sessionId || null))
  }, [sessionId])

  return { sessionId }
}
