import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { logOut } from 'src/state/session/actions'
import { accountSelector } from 'src/state/session/selectors'
import { redirect } from 'src/utils'

const useContainer = () => {
  const dispatch = useDispatch()
  const account = useSelector(accountSelector)
  const location = useLocation()
  const navigate = useNavigate()
  const cb = useCallback(redirect('/login', location, navigate), [location, navigate])

  const handleLogout = () => {
    dispatch(logOut(cb))
  }

  return { account, handleLogout }
}

export default useContainer
