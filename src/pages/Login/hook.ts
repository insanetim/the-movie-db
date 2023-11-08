import type { IUserData } from 'src/store/session/types'

import { unwrapResult } from '@reduxjs/toolkit'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { logIn } from 'src/store/session/actions'
import { loadingSelector } from 'src/store/session/selectors'

import type { LoginHook } from './types'

const useContainer = (): LoginHook => {
  const dispatch = useAppDispatch()
  const loading = useAppSelector(loadingSelector)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogIn = async (userData: IUserData) => {
    const to = location.state?.from?.pathname || '/'
    const promise = await dispatch(logIn(userData))
    const sessionId = unwrapResult(promise)
    if (sessionId) {
      navigate(to, { replace: true })
    }
  }

  return { handleLogIn, loading }
}

export default useContainer
