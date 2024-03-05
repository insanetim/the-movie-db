import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit'
import { max } from 'ramda'
import { SetURLSearchParams } from 'react-router-dom'
import getParams from 'src/utils/helpers/getParams'
import isPresent from 'src/utils/helpers/isPresent'

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

export type UseUpdatePageProps = {
  action: AsyncThunkAction<unknown, unknown, AsyncThunkConfig>
  items: undefined | unknown[]
  page: string
  setSearchParams: SetURLSearchParams
}

const useUpdatePage = ({
  action,
  items,
  page,
  setSearchParams,
}: UseUpdatePageProps) => {
  const dispatch = useAppDispatch()

  const updatePage = () => {
    if (isPresent(items) && items.length === 1 && page !== '1') {
      const nextPage = max(Number(page) - 1, 1)
      setSearchParams(getParams({ page: nextPage }))
    } else {
      dispatch(action)
    }
  }

  return { updatePage }
}

export default useUpdatePage
