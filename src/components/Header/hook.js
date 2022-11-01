import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { logOut } from 'src/state/session/actions'
import { accountSelector } from 'src/state/session/selectors'

export const useContainer = () => {
  const dispatch = useDispatch()
  const account = useSelector(accountSelector)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logOut(() => navigate('/login', { state: { from: location } })))
  }

  return { account, handleLogout }
}
