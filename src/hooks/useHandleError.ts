import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { NOTIFICATION_TYPE } from 'src/constants/app'
import { showNotification } from 'src/store/features/app'
import { useAppDispatch } from 'src/store/hooks'
import errorMessage from 'src/utils/helpers/errorMessage'

const useHandleError = () => {
  const dispatch = useAppDispatch()

  const handleError = (
    error: FetchBaseQueryError | SerializedError | undefined
  ) => {
    dispatch(
      showNotification({
        message: errorMessage(error)!,
        type: NOTIFICATION_TYPE.ERROR,
      })
    )
  }

  return { handleError }
}

export default useHandleError
