import { useLocation, useNavigate } from 'react-router-dom'
import useScrollToTop from 'src/hooks/useScrollToTop'
import {
  selectAccount,
  selectSessionId,
  useDeleteSessionMutation,
  useGetAccountQuery,
} from 'src/store/features/auth'
import { useAppSelector } from 'src/store/hooks'

import { HeaderHookReturn } from './types'

const useContainer = (): HeaderHookReturn => {
  const location = useLocation()
  const navigate = useNavigate()
  const account = useAppSelector(selectAccount)
  const sessionId = useAppSelector(selectSessionId)
  useScrollToTop()

  useGetAccountQuery({ session_id: sessionId! }, { skip: !sessionId })
  const [deleteSession] = useDeleteSessionMutation()

  const handleLogin = () => {
    navigate('/login', { state: { from: location } })
  }

  const handleLogout = () => {
    if (sessionId) {
      deleteSession({ session_id: sessionId })
      navigate('/login', { replace: true, state: { from: location } })
    }
  }

  return {
    account,
    handleLogin,
    handleLogout,
    sessionId,
  }
}

export default useContainer
