import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit'
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

export type UseUpdatePageProps = {
  action: AsyncThunkAction<unknown, unknown, AsyncThunkConfig>
  items: undefined | unknown[]
  page: string
  setSearchParams: SetURLSearchParams
}

const useUpdatePage = ({
  action,
  items: itemsProp,
  page: pageProp,
  setSearchParams: setSearchParamsProp,
}: UseUpdatePageProps) => {
  const dispatch = useAppDispatch()

  const updatePage = () => {
    const items = itemsProp || []
    const page = Number(pageProp)

    if (items.length === 1 && page > 1) {
      setSearchParamsProp(getParams({ page: page - 1 }))
    } else {
      dispatch(action)
    }
  }

  return { updatePage }
}

export default useUpdatePage
