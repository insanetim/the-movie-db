import { SetURLSearchParams } from 'react-router-dom'
import getParams from 'src/utils/helpers/getParams'

export type UseUpdatePageProps = {
  items?: unknown[]
  page: string
  setSearchParams: SetURLSearchParams
}

const useUpdatePage = ({
  items = [],
  page: pageString,
  setSearchParams,
}: UseUpdatePageProps) => {
  const updatePage = () => {
    const page = Number(pageString)

    if (items.length === 1 && page > 1) {
      setSearchParams(getParams({ page: page - 1 }))
    }
  }

  return { updatePage }
}

export default useUpdatePage
