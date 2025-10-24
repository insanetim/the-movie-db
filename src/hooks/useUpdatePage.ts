import { useCallback } from 'react'
import { SetURLSearchParams } from 'react-router-dom'
import getParams from 'src/utils/helpers/getParams'

export type UseUpdatePageProps = {
  items?: unknown[]
  page: string
  setSearchParams: SetURLSearchParams
}

const useUpdatePage = ({
  items = [],
  page: pageProps,
  setSearchParams,
}: UseUpdatePageProps) => {
  const updatePage = useCallback(() => {
    const page = Number(pageProps)

    if (items.length === 1 && page > 1) {
      setSearchParams(getParams({ page: page - 1 }))
    }
  }, [items.length, pageProps, setSearchParams])

  return { updatePage }
}

export default useUpdatePage
