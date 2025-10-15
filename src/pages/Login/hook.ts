import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useHandleError from 'src/hooks/useHandleError'
import {
  useCreateSessionMutation,
  useLazyCreateRequestTokenQuery,
  UserData,
  useValidateWithLoginMutation,
} from 'src/store/features/auth'

import { LoginHookReturn } from './types'

const useContainer = (): LoginHookReturn => {
  const location = useLocation()
  const navigate = useNavigate()
  const { handleError } = useHandleError()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [createRequestToken] = useLazyCreateRequestTokenQuery()
  const [validateWithLogin] = useValidateWithLoginMutation()
  const [createSession] = useCreateSessionMutation()

  const handleLogin = async (userData: UserData) => {
    setIsSubmitting(true)
    try {
      const { request_token } = await createRequestToken().unwrap()
      await validateWithLogin({ request_token, ...userData }).unwrap()
      const { success } = await createSession({ request_token }).unwrap()
      if (success) {
        const to = location.state?.from?.pathname || '/'
        navigate(to, { replace: true })
      }
    } catch (error) {
      handleError(error)
    }
    setIsSubmitting(false)
  }

  return { handleLogin, isSubmitting }
}

export default useContainer
