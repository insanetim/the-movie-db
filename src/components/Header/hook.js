import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { logout } from 'src/store/actions'

export const useContainer = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    dispatch(logout(() => navigate('/login', { state: { from: location } })))
  }

  return { handleLogout }
}
