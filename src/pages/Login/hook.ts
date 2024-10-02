import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { logIn } from 'src/store/auth/actions'
import { UserData } from 'src/store/auth/types'
import { useAppDispatch } from 'src/store/hooks'

import { LoginHookReturn } from './types'

const useContainer = (): LoginHookReturn => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogIn = async (userData: UserData) => {
    setIsSubmitting(true)
    const to = location.state?.from?.pathname || '/'
    const sessionId = await dispatch(logIn(userData)).unwrap()
    setIsSubmitting(false)
    if (sessionId) {
      navigate(to, { replace: true })
    }
  }

  return { handleLogIn, isSubmitting }
}

export default useContainer
