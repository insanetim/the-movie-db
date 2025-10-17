import { Modal } from 'antd'
import { MouseEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import useUpdatePage from 'src/hooks/useUpdatePage'
import { IMovie } from 'src/interfaces/movie.interface'
import { selectAccount } from 'src/store/features/auth'
import {
  useAddToWatchlistMutation,
  useGetWatchlistMoviesQuery,
} from 'src/store/features/watchlist'
import { useAppSelector } from 'src/store/hooks'
import errorMessage from 'src/utils/helpers/errorMessage'
import getParams from 'src/utils/helpers/getParams'

import { WatchlistHookReturn } from './types'

const useContainer = (): WatchlistHookReturn => {
  const account = useAppSelector(selectAccount)
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'

  const {
    data: movies,
    error,
    isLoading,
  } = useGetWatchlistMoviesQuery(page, { skip: !account })
  const [addToWatchlist] = useAddToWatchlistMutation()

  const { updatePage } = useUpdatePage({
    items: movies?.results,
    page,
    setSearchParams,
  })

  const handlePagination = (page: number) => {
    setSearchParams(getParams({ page }))
  }

  const handleMovieDelete = (
    event: MouseEvent<HTMLSpanElement>,
    movieId: IMovie['id']
  ) => {
    event.stopPropagation()

    const onOk = async () => {
      await addToWatchlist({ inWatchlist: false, movieId })
      updatePage()
    }

    Modal.confirm({
      onOk,
      title: 'Do you want to delete movie from watchlist?',
    })

    return onOk
  }

  return {
    error: errorMessage(error),
    handleMovieDelete,
    handlePagination,
    isLoading,
    movies,
  }
}

export default useContainer
