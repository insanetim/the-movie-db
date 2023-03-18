import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { logIn } from 'src/state/session/actions'
import { loadingSelector } from 'src/state/session/selectors'

const useContainer = () => {
  const dispatch = useDispatch()
  const loading = useSelector(loadingSelector)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogIn = async userData => {
    const from = location.state?.from?.pathname || '/'
    await dispatch(logIn(userData))
    navigate(from, { replace: true })
  }

  return { loading, handleLogIn }
}

export default useContainer
