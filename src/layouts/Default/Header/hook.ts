import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'src/hooks/useRedux'
import useScrollToTop from 'src/hooks/useScrollToTop'
import { fetchAccount, logOut } from 'src/store/auth/actions'
import {
  accountSelector,
  isAuthenticatedSelector,
} from 'src/store/auth/selectors'

import { HeaderHookReturn } from './types'

const useContainer = (): HeaderHookReturn => {
  const dispatch = useAppDispatch()
  const account = useSelector(accountSelector)
  const isAuthenticated = useSelector(isAuthenticatedSelector)
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
