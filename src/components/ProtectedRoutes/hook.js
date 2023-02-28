import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { sessionIdSelector } from 'src/state/session/selectors'
import { fetchAccount } from 'src/state/session/actions'

const useContainer = () => {
  const dispatch = useDispatch()
  const sessionId = useSelector(sessionIdSelector)

  useEffect(() => {
    if (sessionId) {
      dispatch(fetchAccount())
    }
  }, [sessionId])

  return { sessionId }
}

export default useContainer
