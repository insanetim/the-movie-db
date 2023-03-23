import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { sessionIdSelector } from 'src/store/session/selectors'
import { fetchAccount } from 'src/store/session/actions'

const useContainer = () => {
  const dispatch = useDispatch()
  const sessionId = useSelector(sessionIdSelector)
  const location = useLocation()

  useEffect(() => {
    if (sessionId) {
      dispatch(fetchAccount())
    }
  }, [sessionId])

  return { sessionId, location }
}

export default useContainer
