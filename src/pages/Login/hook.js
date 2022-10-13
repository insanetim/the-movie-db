import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { login } from 'src/store/actions'

export const useContainer = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const loading = useSelector(state => state.loading)

  const handleLogin = ({ username, password }) => {
    const from = location.state?.from?.pathname || '/'
    dispatch(login({ username, password }, () => navigate(from, { replace: true })))
  }

  return { handleLogin, loading }
}
