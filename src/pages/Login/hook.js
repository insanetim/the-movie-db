import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { logIn } from 'src/state/session/actions'
import { loadingSelector } from 'src/state/session/selectors'

const useContainer = () => {
  const dispatch = useDispatch()
  const loading = useSelector(loadingSelector)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogIn = userData => {
    const from = location.state?.from?.pathname || '/'
    const callback = () => navigate(from, { replace: true })
    dispatch(logIn({ userData, callback }))

    return callback
  }

  return { loading, handleLogIn }
}

export default useContainer
