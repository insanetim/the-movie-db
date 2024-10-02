import { SetURLSearchParams } from 'react-router-dom'
import { AppThunk } from 'src/store'
import { useAppDispatch } from 'src/store/hooks'
import getParams from 'src/utils/helpers/getParams'

export type UseUpdatePageProps = {
  action: AppThunk
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
