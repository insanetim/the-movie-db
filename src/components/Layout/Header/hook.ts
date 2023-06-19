import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { logOut } from 'src/store/session/actions'
import { accountSelector } from 'src/store/session/selectors'

import type { HeaderHook } from './types'

const useContainer = (): HeaderHook => {
  const dispatch = useAppDispatch()
  const account = useAppSelector(accountSelector)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogOut = async () => {
    await dispatch(logOut())
    navigate('/login', { state: { from: location } })
  }

  return { account, handleLogOut }
}

export default useContainer
