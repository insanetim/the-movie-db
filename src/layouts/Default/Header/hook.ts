import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useScrollToTop from 'src/hooks/useScrollToTop'
import { fetchAccount, logOut } from 'src/store/auth/actions'
import {
  accountSelector,
  isAuthenticatedSelector,
} from 'src/store/auth/selectors'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'

import { HeaderHookReturn } from './types'

const useContainer = (): HeaderHookReturn => {
  const dispatch = useAppDispatch()
  const account = useAppSelector(accountSelector)
  const isAuthenticated = useAppSelector(isAuthenticatedSelector)
  const location = useLocation()
  const navigate = useNavigate()
  useScrollToTop()

  const handleLogIn = () => {
    navigate('/login', {
      state: { from: location },
    })
  }

  const handleLogOut = () => {
    dispatch(logOut())
    navigate('/login', {
      replace: true,
      state: { from: location },
    })
  }

  useEffect(() => {
    if (!account && isAuthenticated) {
      dispatch(fetchAccount())
    }
  }, [account, dispatch, isAuthenticated])

  return { account, handleLogIn, handleLogOut, isAuthenticated }
}

export default useContainer
