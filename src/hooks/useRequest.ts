import type { AsyncThunkAction } from '@reduxjs/toolkit'

import { type Dispatch, unwrapResult } from '@reduxjs/toolkit'
import { useCallback, useState } from 'react'

import { useAppDispatch } from './useRedux'

declare type AsyncThunkConfig = {
  dispatch?: Dispatch
  extra?: unknown
  fulfilledMeta?: unknown
  pendingMeta?: unknown
  rejectValue?: unknown
  rejectedMeta?: unknown
  serializedErrorType?: unknown
  state?: unknown
}

const useRequest = (initialLoading = true) => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(initialLoading)
  const [error, setError] = useState<null | string>(null)

  const request = useCallback(
    async (action: AsyncThunkAction<unknown, unknown, AsyncThunkConfig>) => {
      setLoading(true)
      setError(null)

      try {
        unwrapResult(await dispatch(action))
      } catch (e) {
        setError(e as string)
      }

      setLoading(false)
    },
    [dispatch]
  )

  return { error, loading, request }
}

export default useRequest
