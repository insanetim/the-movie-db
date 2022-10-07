import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { login } from 'src/store/actions'

export const useContainer = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogin = ({ username, password }) => {
    const payload = { username, password }
    const from = location.state?.from?.pathname || '/'
    dispatch(login(payload, () => navigate(from, { replace: true })))
  }

  const loading = useSelector(state => state.loading)

  return { handleLogin, loading }
}
