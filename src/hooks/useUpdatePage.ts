import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit'
import { isNotNil, max } from 'ramda'
import { SetURLSearchParams } from 'react-router-dom'
import getParams from 'src/utils/helpers/getParams'

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

export interface useUpdatePageProps {
  action: AsyncThunkAction<unknown, unknown, AsyncThunkConfig>
  items: undefined | unknown[]
  page: string
  setSearchParams: SetURLSearchParams
}

const useUpdatePage = ({
  action,
  items,
  page,
  setSearchParams
}: useUpdatePageProps) => {
  const dispatch = useAppDispatch()

  const updatePage = () => {
    if (isNotNil(items) && items.length === 1 && page !== '1') {
      const nextPage = max(Number(page) - 1, 1)
      setSearchParams(getParams({ page: nextPage }))
    } else {
      dispatch(action)
    }
  }

  return { updatePage }
}

export default useUpdatePage
