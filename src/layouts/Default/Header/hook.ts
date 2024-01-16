import { isNil } from 'ramda'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'src/hooks/useRedux'
import { fetchAccount, logOut } from 'src/store/auth/actions'
import { accountSelector } from 'src/store/auth/selectors'

import { HeaderHookReturn } from './types'

const useContainer = (): HeaderHookReturn => {
  const dispatch = useAppDispatch()
  const account = useSelector(accountSelector)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogOut = async () => {
    await dispatch(logOut())
    navigate('/login', {
      replace: true,
      state: { from: location },
    })
  }

  useEffect(() => {
    if (isNil(account)) {
      dispatch(fetchAccount())
    }
  }, [account, dispatch])

  return { account, handleLogOut }
}

export default useContainer
