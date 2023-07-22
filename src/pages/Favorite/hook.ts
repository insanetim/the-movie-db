import { Modal } from 'antd'
import { MouseEvent, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import useRequest from 'src/hooks/useRequest'
import { fetchFavorite } from 'src/store/favorite/actions'
import { favoriteMoviesSelector } from 'src/store/favorite/selectors'
import { changeMovieInFavorite } from 'src/store/movie/actions'
import { accountSelector } from 'src/store/session/selectors'
import isNull from 'src/utils/helpers/isNull'

import type { FavoriteHook } from './types'

const useContainer = (): FavoriteHook => {
  const dispatch = useAppDispatch()
  const account = useAppSelector(accountSelector)
  const movies = useAppSelector(favoriteMoviesSelector)
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const { error, loading, request } = useRequest()

  const handlePagination = (page: number) => {
    setSearchParams(new URLSearchParams({ page: page.toString() }))
  }

  const handleMovieDelete = (movieId: number, event: MouseEvent<HTMLSpanElement>): (() => void) => {
    event.stopPropagation()

    const onOk = () => {
      dispatch(changeMovieInFavorite({ inFavorite: false, movieId }))
    }

    Modal.confirm({
      onOk,
      title: 'Do you want to delete movie from favorite?'
    })

    return onOk
  }

  useEffect(() => {
    if (!isNull(account)) {
      request(fetchFavorite(page))
    }
  }, [account, page, request])

  return { error, handleMovieDelete, handlePagination, loading, movies }
}

export default useContainer
