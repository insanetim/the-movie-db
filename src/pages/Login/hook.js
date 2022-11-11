import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { logIn } from 'src/state/session/actions'
import { loadingSelector } from 'src/state/app/selectors'

const useContainer = () => {
  const dispatch = useDispatch()
  const loading = useSelector(loadingSelector)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogIn = ({ username, password }) => {
    const from = location.state?.from?.pathname || '/'
    const cb = () => navigate(from, { replace: true })
    dispatch(logIn({ username, password }, cb))

    return cb
  }

  return { loading, handleLogIn }
}

export default useContainer
