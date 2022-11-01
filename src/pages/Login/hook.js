import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { logIn } from 'src/state/session/actions'
import { loadingSelector } from 'src/state/app/selectors'

export const useContainer = () => {
  const dispatch = useDispatch()
  const loading = useSelector(loadingSelector)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogin = ({ username, password }) => {
    const from = location.state?.from?.pathname || '/'
    dispatch(logIn({ username, password }, () => navigate(from, { replace: true })))
  }

  return { handleLogin, loading }
}
